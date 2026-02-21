from django.db import models
from django.contrib.auth.models import User


class VehicleType(models.Model):
    """Truck, Van, Bike — prevents transitive dependency in Vehicle."""
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Region(models.Model):
    """North, South, East, West — prevents transitive dependency in Vehicle/Trip."""
    name = models.CharField(max_length=30, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class MaintenanceType(models.Model):
    """Oil Change, Engine Overhaul, etc. — prevents transitive dependency in MaintenanceLog."""
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name



class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('Fleet Manager', 'Fleet Manager'),
        ('Dispatcher', 'Dispatcher'),
        ('Safety Officer', 'Safety Officer'),
        ('Financial Analyst', 'Financial Analyst'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='Fleet Manager')

    def __str__(self):
        return f"{self.user.username} ({self.role})"



class Vehicle(models.Model):
    """
    2NF: Every non-key column depends on the full PK (vid).
    3NF: vehicle_type and region are FKs to lookup tables
         — no transitive dependency.
    """
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('On Trip', 'On Trip'),
        ('In Shop', 'In Shop'),
        ('Retired', 'Retired'),
    ]

    vid = models.CharField(max_length=10, unique=True, editable=False)
    name = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    plate = models.CharField(max_length=30, unique=True)
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.PROTECT, related_name='vehicles')
    capacity = models.PositiveIntegerField(help_text='Max load in kg')
    odometer = models.PositiveIntegerField(default=0)
    acquisition_cost = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Available')
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='vehicles')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['vid']

    def __str__(self):
        return f"{self.name} ({self.plate})"

    def save(self, *args, **kwargs):
        if not self.vid:
            last = Vehicle.objects.order_by('-vid').first()
            num = int(last.vid[1:]) + 1 if last else 1
            self.vid = f'V{num:03d}'
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'id': self.vid,
            'name': self.name,
            'model': self.model_name,
            'plate': self.plate,
            'type': self.vehicle_type.name,
            'capacity': self.capacity,
            'odometer': self.odometer,
            'acquisition_cost': self.acquisition_cost,
            'status': self.status,
            'region': self.region.name,
        }


class Driver(models.Model):
    """
    3NF: Category (license classes) moved to junction table
         DriverLicenseCategory — no multi-valued or transitive deps.
    """
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('On Duty', 'On Duty'),
        ('Off Duty', 'Off Duty'),
        ('Suspended', 'Suspended'),
    ]

    did = models.CharField(max_length=10, unique=True, editable=False)
    name = models.CharField(max_length=100)
    license_no = models.CharField(max_length=30, unique=True)
    expiry = models.DateField()
    phone = models.CharField(max_length=15)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Available')
    trips_count = models.PositiveIntegerField(default=0)
    safety = models.PositiveIntegerField(default=80)
    address = models.CharField(max_length=200, blank=True, default='')
    emergency = models.CharField(max_length=15, blank=True, default='')
    joining = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['did']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.did:
            last = Driver.objects.order_by('-did').first()
            num = int(last.did[1:]) + 1 if last else 1
            self.did = f'D{num:03d}'
        super().save(*args, **kwargs)

    def category_list(self):
        """Return list of vehicle type names this driver is licensed for."""
        return list(
            self.license_categories
                .select_related('vehicle_type')
                .values_list('vehicle_type__name', flat=True)
        )

    def to_dict(self):
        return {
            'id': self.did,
            'name': self.name,
            'license': self.license_no,
            'category': self.category_list(),
            'expiry': str(self.expiry),
            'phone': self.phone,
            'status': self.status,
            'trips': self.trips_count,
            'safety': self.safety,
            'address': self.address,
            'emergency': self.emergency,
            'joining': str(self.joining) if self.joining else '',
        }


class DriverLicenseCategory(models.Model):
    """
    Junction table — resolves the M:N between Driver and VehicleType.
    Satisfies 1NF: no multi-valued attributes on Driver.
    """
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='license_categories')
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE, related_name='licensed_drivers')

    class Meta:
        unique_together = ('driver', 'vehicle_type')
        verbose_name_plural = 'Driver license categories'

    def __str__(self):
        return f"{self.driver.name} → {self.vehicle_type.name}"




class Trip(models.Model):
    """
    3NF: vehicle, driver, region are all FKs — no transitive deps.
    """
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Dispatched', 'Dispatched'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    tid = models.CharField(max_length=10, unique=True, editable=False)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='trips')
    driver = models.ForeignKey(Driver, on_delete=models.PROTECT, related_name='trips')
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='trips')
    cargo_weight = models.PositiveIntegerField()
    cargo_desc = models.TextField(blank=True, default='')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Draft')
    date = models.DateField()
    odometer_start = models.PositiveIntegerField(default=0)
    odometer_end = models.PositiveIntegerField(null=True, blank=True)
    revenue = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-tid']

    def __str__(self):
        return f"{self.tid}: {self.origin} → {self.destination}"

    def save(self, *args, **kwargs):
        if not self.tid:
            last = Trip.objects.order_by('-tid').first()
            num = int(last.tid[1:]) + 1 if last else 1
            self.tid = f'T{num:03d}'
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'id': self.tid,
            'vehicle_id': self.vehicle.vid,
            'driver_id': self.driver.did,
            'origin': self.origin,
            'destination': self.destination,
            'region': self.region.name,
            'cargo_weight': self.cargo_weight,
            'cargo_desc': self.cargo_desc,
            'status': self.status,
            'date': str(self.date),
            'odometer_start': self.odometer_start,
            'odometer_end': self.odometer_end,
            'revenue': self.revenue,
        }


class MaintenanceLog(models.Model):
    """
    3NF: maintenance_type is FK to MaintenanceType lookup table.
    """
    STATUS_CHOICES = [
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    mid = models.CharField(max_length=10, unique=True, editable=False)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='maintenance_logs')
    maintenance_type = models.ForeignKey(
        MaintenanceType, on_delete=models.PROTECT, related_name='logs'
    )
    date = models.DateField()
    cost = models.PositiveIntegerField(default=0)
    technician = models.CharField(max_length=100, blank=True, default='')
    notes = models.TextField(blank=True, default='')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='In Progress')
    est_completion = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.mid}: {self.maintenance_type.name} — {self.vehicle.name}"

    def save(self, *args, **kwargs):
        if not self.mid:
            last = MaintenanceLog.objects.order_by('-mid').first()
            num = int(last.mid[1:]) + 1 if last else 1
            self.mid = f'M{num:03d}'
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'id': self.mid,
            'vehicle_id': self.vehicle.vid,
            'type': self.maintenance_type.name,
            'date': str(self.date),
            'cost': self.cost,
            'technician': self.technician,
            'notes': self.notes,
            'status': self.status,
            'est_completion': str(self.est_completion) if self.est_completion else '',
        }


class FuelLog(models.Model):
    """
    3NF: vehicle and trip are FKs. All non-key attrs
         depend only on PK — no transitive deps.
    """
    fid = models.CharField(max_length=10, unique=True, editable=False)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='fuel_logs')
    trip = models.ForeignKey(
        Trip, on_delete=models.SET_NULL, null=True, blank=True, related_name='fuel_logs'
    )
    liters = models.FloatField()
    cost = models.PositiveIntegerField(default=0)
    date = models.DateField()
    km_driven = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.fid}: {self.liters}L — {self.vehicle.name}"

    def save(self, *args, **kwargs):
        if not self.fid:
            last = FuelLog.objects.order_by('-fid').first()
            num = int(last.fid[1:]) + 1 if last else 1
            self.fid = f'F{num:03d}'
        super().save(*args, **kwargs)

    @property
    def fuel_efficiency(self):
        if self.liters and self.liters > 0:
            return self.km_driven / self.liters
        return 0

    def to_dict(self):
        return {
            'id': self.fid,
            'vehicle_id': self.vehicle.vid,
            'trip_id': self.trip.tid if self.trip else None,
            'liters': self.liters,
            'cost': self.cost,
            'date': str(self.date),
            'km_driven': self.km_driven,
        }
