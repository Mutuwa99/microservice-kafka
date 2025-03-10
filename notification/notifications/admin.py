from django.contrib import admin
from .models import Registration_Notification
from .models import Appointment_Notification
# Register your models here.
admin.site.register(Registration_Notification)
admin.site.register(Appointment_Notification)