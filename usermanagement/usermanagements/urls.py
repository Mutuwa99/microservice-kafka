from . import views
from django.urls import path
from .views import login,register_user  # Import the login function


urlpatterns = [
    path('api/v2/user/create', views.register_user, name="create-user"),
    path("api/v2/user/login/", login, name="login"),

]