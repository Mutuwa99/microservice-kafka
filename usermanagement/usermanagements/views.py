from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .signals import send_user_created_event  # Import the signal to trigger Kafka event
from django.conf import settings
import requests
import jwt



@api_view(["POST"])
def login(request):
    try:
        data = request.data
        username = data.get("username")
        password = data.get("password")

        keycloak_url = settings.KEYCLOAK_SERVER_URL

        payload = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "grant_type": "password",
            "username": username,
            "password": password,
            "scope": "openid profile email"  # Requesting additional profile and email details
        }

        headers = {"Content-Type": "application/x-www-form-urlencoded"}

        response = requests.post(keycloak_url, data=payload, headers=headers)

        if response.status_code == 200:
            token_data = response.json()

            # Decode the access_token to extract user details
            access_token = token_data.get("access_token")
            refresh_token = token_data.get("refresh_token")
            
            if access_token:
                # Decode the access token (JWT)
                decoded_token = jwt.decode(access_token, options={"verify_signature": False})

                # Extract relevant user information
                username = decoded_token.get("preferred_username")
                email = decoded_token.get("email")
                roles = decoded_token.get("realm_access", {}).get("roles", [])

                # Return the user details along with the access token
                return JsonResponse({
                    "success": True,
                    "data": {
                        "access_token": access_token,
                        "username": username,
                        "email": email,
                        "refresh_token": refresh_token,
                        "roles": roles  # Returning user roles,
                    }
                })
            else:
                return JsonResponse({"success": False, "error": "No access_token received"}, status=400)

        else:
            return JsonResponse(
                {"success": False, "error": response.json()},
                status=response.status_code,
            )

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


# ✅ FIXED USER CREATION FUNCTION
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def register_user(request):
    try:
        data = request.data  # Use request.data instead of json.loads(request.body)

        # Extract user data with default values to prevent crashes
        user_data = {
            'role': data.get('role', ''),
            'first_name': data.get('first_name', ''),
            'last_name': data.get('last_name', ''),
            'age': data.get('age'),
            'id_number': data.get('id_number'),
            'gender': data.get('gender'),
            'email': data.get('email', ''),
            'phone_number': data.get('phone_number'),
            'address': data.get('address', ''),
            'username': data.get('email', '')  # Username set to email
        }

        # Create new user instance
        user = CustomUser.objects.create(**user_data)

        # ✅ Trigger Kafka event
        send_user_created_event(CustomUser, user, created=True)

        return JsonResponse({'success': True, 'user_id': user.id})

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)

