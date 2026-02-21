from django.contrib import admin
from .models import (
    VehicleType, Region, MaintenanceType, UserProfile,
    Vehicle, Driver, DriverLicenseCategory, Trip, MaintenanceLog, FuelLog
)

@admin.register(VehicleType)
class VehicleTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(MaintenanceType)
class MaintenanceTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    list_filter = ('role',)

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vid', 'name', 'plate', 'vehicle_type', 'region', 'status')
    list_filter = ('vehicle_type', 'region', 'status')
    search_fields = ('vid', 'name', 'plate')

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('did', 'name', 'license_no', 'status', 'trips_count', 'safety')
    list_filter = ('status',)
    search_fields = ('did', 'name', 'license_no')

@admin.register(DriverLicenseCategory)
class DriverLicenseCategoryAdmin(admin.ModelAdmin):
    list_display = ('driver', 'vehicle_type')

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('tid', 'vehicle', 'driver', 'origin', 'destination', 'status', 'date')
    list_filter = ('status', 'region', 'date')
    search_fields = ('tid', 'origin', 'destination')

@admin.register(MaintenanceLog)
class MaintenanceLogAdmin(admin.ModelAdmin):
    list_display = ('mid', 'vehicle', 'maintenance_type', 'date', 'status', 'cost')
    list_filter = ('status', 'maintenance_type', 'date')

@admin.register(FuelLog)
class FuelLogAdmin(admin.ModelAdmin):
    list_display = ('fid', 'vehicle', 'date', 'liters', 'cost', 'km_driven')
    list_filter = ('date',)
