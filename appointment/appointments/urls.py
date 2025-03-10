from django.urls import path
from . import views

urlpatterns = [
    path('api/v2/appointment/create', views.create_appointment, name="create-appointment"), 
    path('api/v2/appointment/fetch_app_data', views.fetch_app_stats, name="fetch_app_data"), # Added endpoint for creating an appointment
    path('api/v2/appointment/fetch_appointments', views.fetch_appointments, name="fetch_app"), # Added endpoint for creating an appointment
    path('api/v2/appointment/fetch_appointments_history', views.fetch_appointments_history, name="fetch_appointments_history"), # Added endpoint for creating an appointment
    path('api/v2/appointment/update', views.update_appointment, name="update_appointment"), # Added endpoint for creating an appointment
]



