from django.contrib import admin
from django.urls import path,include

from django.contrib import admin

admin.site.site_header = "Appointments Service"
admin.site.site_title = "Appointments Service"
admin.site.index_title = "Welcome to  Appointments Service"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include('appointments.urls')),
]