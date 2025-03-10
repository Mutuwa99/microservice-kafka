from django.contrib import admin
from django.urls import path,include

from django.contrib import admin

admin.site.site_header = "User Notification Service"
admin.site.site_title = "User Notification Service"
admin.site.index_title = "Welcome to  the Notification Service"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include('notifications.urls')),
]