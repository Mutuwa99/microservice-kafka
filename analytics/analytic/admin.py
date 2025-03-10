from django.contrib import admin

# Register your models here.
from .models import UserAnalytics
from .models import AppointmentAnalytics

admin.site.register(UserAnalytics)
admin.site.register(AppointmentAnalytics)


