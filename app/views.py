from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.utils import timezone
from datetime import timedelta
from django.db import models
from django.db.models import Sum, Count, F, ExpressionWrapper, FloatField
from app.models import (
    Vehicle, Driver, Trip, MaintenanceLog, FuelLog, UserProfile,
    VehicleType, Region, MaintenanceType
)

@login_required
def dashboard(request):
    vehicles = Vehicle.objects.all()
    trips = Trip.objects.all()
    
    # KPI Calculations
    on_trip_count = vehicles.filter(status='On Trip').count()
    total_count = vehicles.count()
    util_rate = (on_trip_count / total_count * 100) if total_count > 0 else 0
    available_count = vehicles.filter(status='Available').count()
    in_shop_count = vehicles.filter(status='In Shop').count()
    pending_cargo_trips = trips.filter(status='Draft')
    pending_cargo_weight = pending_cargo_trips.aggregate(Sum('cargo_weight'))['cargo_weight__sum'] or 0
    
    context = {
        'active_page': 'dashboard',
        'vehicles': vehicles,
        'on_trip_count': on_trip_count,
        'available_count': available_count,
        'total_count': total_count,
        'util_rate': f"{util_rate:.1f}",
        'in_shop_count': in_shop_count,
        'pending_cargo_count': pending_cargo_trips.count(),
        'pending_cargo_weight': pending_cargo_weight,
        'regions': Region.objects.all(),
        'vehicle_types': VehicleType.objects.all(),
        'live_fleet': vehicles.prefetch_related('trips', 'trips__driver')[:10],
    }
    return render(request, 'app/dashboard.html', context)

@login_required
def vehicles(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        model_name = request.POST.get('model_name')
        plate = request.POST.get('plate')
        v_type_id = request.POST.get('vehicle_type')
        region_id = request.POST.get('region')
        capacity = request.POST.get('capacity')
        odometer = request.POST.get('odometer')
        acquisition_cost = request.POST.get('acquisition_cost')

        v_type = VehicleType.objects.get(id=v_type_id)
        region_obj = Region.objects.get(id=region_id)

        Vehicle.objects.create(
            name=name,
            model_name=model_name,
            plate=plate,
            vehicle_type=v_type,
            region=region_obj,
            capacity=capacity,
            odometer=odometer,
            acquisition_cost=acquisition_cost or 0
        )
        return redirect('vehicles')

    vehicles_list = Vehicle.objects.all().select_related('vehicle_type', 'region')
    context = {
        'active_page': 'vehicles',
        'vehicles': vehicles_list,
        'total_count': vehicles_list.count(),
        'available_count': vehicles_list.filter(status='Available').count(),
        'on_trip_count': vehicles_list.filter(status='On Trip').count(),
        'in_shop_count': vehicles_list.filter(status='In Shop').count(),
        'vehicle_types': VehicleType.objects.all(),
        'regions': Region.objects.all(),
    }
    return render(request, 'app/vehicles.html', context)

@login_required
def trips(request):
    if request.method == 'POST':
        v_id = request.POST.get('vehicle')
        d_id = request.POST.get('driver')
        r_id = request.POST.get('region')
        
        Trip.objects.create(
            vehicle=Vehicle.objects.get(id=v_id),
            driver=Driver.objects.get(id=d_id),
            region=Region.objects.get(id=r_id),
            origin=request.POST.get('origin'),
            destination=request.POST.get('destination'),
            cargo_weight=request.POST.get('cargo_weight'),
            cargo_desc=request.POST.get('cargo_desc') or '',
            date=request.POST.get('date'),
            revenue=request.POST.get('revenue') or 0,
            odometer_start=request.POST.get('odometer_start') or 0,
            status='Draft'
        )
        return redirect('trips')

    trips_list = Trip.objects.all().select_related('vehicle', 'driver', 'region')
    
    status_filter = request.GET.get('status')
    if status_filter and status_filter != 'All':
        trips_list = trips_list.filter(status=status_filter)

    context = {
        'active_page': 'trips',
        'trips': trips_list,
        'draft_count': Trip.objects.filter(status='Draft').count(),
        'dispatched_count': Trip.objects.filter(status='Dispatched').count(),
        'completed_count': Trip.objects.filter(status='Completed').count(),
        'cancelled_count': Trip.objects.filter(status='Cancelled').count(),
        'available_vehicles': Vehicle.objects.filter(status='Available'),
        'available_drivers': Driver.objects.filter(status='Available'),
        'regions': Region.objects.all(), # Added regions to context
    }
    return render(request, 'app/trips.html', context)

@login_required
def maintenance(request):
    if request.method == 'POST':
        v_id = request.POST.get('vehicle')
        m_type_id = request.POST.get('maintenance_type')
        status = request.POST.get('status', 'In Progress')
        
        log = MaintenanceLog.objects.create(
            vehicle=Vehicle.objects.get(id=v_id),
            maintenance_type=MaintenanceType.objects.get(id=m_type_id),
            date=request.POST.get('date'),
            cost=request.POST.get('cost') or 0,
            technician=request.POST.get('technician') or '',
            notes=request.POST.get('notes') or '',
            status=status,
            est_completion=request.POST.get('est_completion') or None
        )

        if status == 'In Progress':
            vehicle = log.vehicle
            vehicle.status = 'In Shop'
            vehicle.save()
            
        return redirect('maintenance')

    logs = MaintenanceLog.objects.all().select_related('vehicle', 'maintenance_type')
    context = {
        'active_page': 'maintenance',
        'logs': logs,
        'in_progress_count': logs.filter(status='In Progress').count(),
        'total_cost': logs.aggregate(Sum('cost'))['cost__sum'] or 0,
        'vehicles': Vehicle.objects.exclude(status='Retired'),
        'maintenance_types': MaintenanceType.objects.all(),
    }
    return render(request, 'app/maintenance.html', context)

@login_required
def expenses(request):
    if request.method == 'POST':
        v_id = request.POST.get('vehicle')
        t_id = request.POST.get('trip')
        
        FuelLog.objects.create(
            vehicle=Vehicle.objects.get(id=v_id),
            trip=Trip.objects.get(id=t_id) if t_id else None,
            liters=float(request.POST.get('liters')),
            cost=request.POST.get('cost') or 0,
            date=request.POST.get('date'),
            km_driven=request.POST.get('km_driven') or 0
        )
        return redirect('expenses')

    logs = FuelLog.objects.all().select_related('vehicle', 'trip')
    context = {
        'active_page': 'expenses',
        'logs': logs,
        'total_liters': logs.aggregate(Sum('liters'))['liters__sum'] or 0,
        'total_cost': logs.aggregate(Sum('cost'))['cost__sum'] or 0,
        'vehicles': Vehicle.objects.exclude(status='Retired'),
        'active_trips': Trip.objects.filter(status='Dispatched'), 
        'today': timezone.now().date(),
    }
    return render(request, 'app/fuel.html', context)

from django.shortcuts import render, redirect, get_object_or_404

@login_required
def drivers(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'delete':
            driver_id = request.POST.get('driver_id')
            driver = get_object_or_404(Driver, id=driver_id)
            driver.delete()
            return redirect('drivers')

        driver_id = request.POST.get('driver_id') 
        name = request.POST.get('name')
        license_no = request.POST.get('license_no')
        expiry = request.POST.get('expiry')
        phone = request.POST.get('phone')
        status = request.POST.get('status', 'Available')
        safety = request.POST.get('safety', 80)

        if driver_id:
            driver = get_object_or_404(Driver, id=driver_id)
            driver.name = name
            driver.license_no = license_no
            driver.expiry = expiry
            driver.phone = phone
            driver.status = status
            driver.safety = safety
            driver.save()
        else:
            Driver.objects.create(
                name=name, license_no=license_no, expiry=expiry,
                phone=phone, status=status, safety=safety
            )
        return redirect('drivers')

    drivers_list = Driver.objects.all()
    today = timezone.now().date()
    
    context = {
        'active_page': 'drivers',
        'drivers': drivers_list,
        'available_count': drivers_list.filter(status='Available').count(),
        'expired_count': drivers_list.filter(expiry__lt=today).count(),
    }
    return render(request, 'app/drivers.html', context)

@login_required
def analytics(request):
    completed_trips = Trip.objects.filter(status='Completed')
    total_revenue = completed_trips.aggregate(Sum('revenue'))['revenue__sum'] or 0
    total_fuel = FuelLog.objects.aggregate(Sum('cost'))['cost__sum'] or 0
    total_maint = MaintenanceLog.objects.aggregate(Sum('cost'))['cost__sum'] or 0
    
    vehicles_stat = Vehicle.objects.annotate(
        revenue_sum=Sum('trips__revenue', filter=models.Q(trips__status='Completed')),
        fuel_sum=Sum('fuel_logs__cost'),
        maint_sum=Sum('maintenance_logs__cost'),
        total_km=Sum('fuel_logs__km_driven'),
    )
    
    net_margin = ((total_revenue - total_fuel - total_maint) / total_revenue * 100) if total_revenue > 0 else 0
    
    context = {
        'active_page': 'analytics',
        'total_revenue': total_revenue,
        'total_fuel': total_fuel,
        'total_maint': total_maint,
        'net_margin': f"{net_margin:.1f}",
        'vehicles': vehicles_stat,
    }
    return render(request, 'app/analytics.html', context)

@login_required
def settings(request):
    return render(request, 'app/settings_page.html', {'active_page': 'settings'})

def custom_login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        u = request.POST.get('username')
        p = request.POST.get('password')
        user = authenticate(request, username=u, password=p)
        if user is not None:
            auth_login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'app/login.html', {'error': 'Invalid credentials'})
    return render(request, 'app/login.html')

def custom_logout(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('login')

def forgot_password(request):
    return render(request, 'app/forgot_password.html')