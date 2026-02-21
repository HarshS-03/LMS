from django.urls import path
from . import views

urlpatterns = [
    path('', views.custom_login, name='login'),
    path('logout/', views.custom_logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('vehicles/', views.vehicles, name='vehicles'),
    path('trips/', views.trips, name='trips'),
    path('maintenance/', views.maintenance, name='maintenance'),
    path('expenses/', views.expenses, name='expenses'),
    path('drivers/', views.drivers, name='drivers'),
    path('analytics/', views.analytics, name='analytics'),
    path('settings/', views.settings, name='settings'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
]
