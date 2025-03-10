from django.contrib import admin
from django.urls import path,include

from django.contrib import admin

admin.site.site_header = "User Management Service"
admin.site.site_title = "User Management Service"
admin.site.index_title = "Welcome to  the User Management Service"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include('usermanagements.urls')),
]