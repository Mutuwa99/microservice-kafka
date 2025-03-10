import requests
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import Appointment
from .signals import send_appointment_created_event  # Import the signal to trigger Kafka event
from django.conf import settings
from rest_framework.decorators import api_view

@csrf_exempt
def create_appointment(request):
    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JsonResponse({"error": "Authorization token is missing"}, status=400)

        token = auth_header.split()[1]  # Extract token from header
        
        # Introspection URL for Keycloak token verification
        introspection_url = f'{settings.KEYCLOAK_SERVER_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect'
        
        # Prepare the introspection request payload
        data = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "token": token
        }

        # Make the introspection request to Keycloak
        response = requests.post(introspection_url, data=data)

        if response.status_code == 200:
            token_data = response.json()

            if token_data.get("active"):
                # Token is valid, proceed with creating the appointment
                data = json.loads(request.body)  # Extract data from the request body

                # Extract relevant fields for the appointment
                patient_id = data.get('patient_id')
                doctor_id = data.get('doctor_id')
                status = data.get('status', 'Scheduled')  # Default to 'Scheduled'
                appointment_date = data.get('appointment_date')
                appointment_time = data.get('appointment_time')
                reason = data.get('reason')

                # Create the Appointment instance and save it
                appointment = Appointment.objects.create(
                    patient_id=patient_id,
                    doctor_id=doctor_id,
                    status=status,
                    appointment_date=appointment_date,
                    appointment_time=appointment_time,
                    reason=reason
                )

                # Retrieve the user associated with the token
                user_data = token_data.get('sub')  # Typically the 'sub' claim represents the user
                user = None
                if user_data:
                    # Optionally, you can fetch the user from the database based on the sub
                    # user = User.objects.get(id=user_data)
                    user = 'replace_with_user_fetch_logic'  # Replace with actual user fetch logic

                if user:
                    # Send Kafka event or other side effects
                    print(Appointment)
                    send_appointment_created_event(Appointment, user, created=True)
                else:
                    print("User not found based on token")

                # Return success message with appointment ID
                return JsonResponse({'success': True, 'appointment_id': appointment.id})

            else:
                # Token is invalid or expired
                return JsonResponse({"error": "Invalid or expired token"}, status=401)
        else:
            # Handle error if introspection fails
            return JsonResponse({"error": "Error validating token with Keycloak"}, status=500)

    except Exception as e:
        # Handle unexpected exceptions
        return JsonResponse({"success": False, "error": str(e)}, status=500)


#fetch data for stats
def fetch_app_stats(request):
    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JsonResponse({"error": "Authorization token is missing"}, status=400)

        token = auth_header.split()[1]  # Extract token from header
        
        # Introspection URL for Keycloak token verification
        introspection_url = f'{settings.KEYCLOAK_SERVER_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect'
        
        # Prepare the introspection request payload
        data = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "token": token
        }

        # Make the introspection request to Keycloak
        response = requests.post(introspection_url, data=data)

        # If the response is not successful, return an error
        if response.status_code != 200 or response.json().get("active") is not True:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # If token is valid, proceed with fetching appointment data
        scheduled_count = Appointment.objects.filter(status='Scheduled').count()
        canceled_count = Appointment.objects.filter(status='Cancelled').count()
        completed_count = Appointment.objects.filter(status='Completed').count()

        total_appointments = Appointment.objects.count()

        high_priority_count = Appointment.objects.filter(priority='Emergency').count()
        medium_priority_count = Appointment.objects.filter(priority='Normal').count()

        fetch_all_apps = Appointment.objects.all().order_by('-appointment_date')[:5]
        latest_five_appointments = Appointment.objects.all().order_by('-appointment_date')[:5]
        high_priority_all = Appointment.objects.filter(priority='Emergency')

        response_data = {
            'scheduled': scheduled_count,
            'canceled': canceled_count,
            'completed': completed_count,
            'total_appointments': total_appointments,
            'high_priority': high_priority_count,
            'medium_priority': medium_priority_count,
            'all_apps':list(fetch_all_apps.values()),
            'latest_five_appointments': list(latest_five_appointments.values()),
            'high_priority_count': high_priority_count,
            'high_priority_all': list(high_priority_all.values())
            
        }

        return JsonResponse(response_data)

    except Exception as e:
        # Handle unexpected exceptions
        return JsonResponse({"success": False, "error": str(e)}, status=500)

#fetch app based on catergory , list them on each view 
def fetch_appointments(request):
    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JsonResponse({"error": "Authorization token is missing"}, status=400)

        token = auth_header.split()[1]  # Extract token from header
        
        # Introspection URL for Keycloak token verification
        introspection_url = f'{settings.KEYCLOAK_SERVER_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect'
        
        # Prepare the introspection request payload
        data = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "token": token
        }

        # Make the introspection request to Keycloak
        response = requests.post(introspection_url, data=data)

        # If the response is not successful, return an error
        if response.status_code != 200 or response.json().get("active") is not True:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # Fetch all appointments ordered by appointment date
        all_appointments = Appointment.objects.all().order_by('-appointment_date')

        # Fetch completed appointments (status = 'Completed')
        completed_appointments = Appointment.objects.filter(status='Completed').order_by('-appointment_date')

        scheduled_appointments = Appointment.objects.filter(status='Scheduled').order_by('-appointment_date') 

        # Fetch cancelled appointments (status = 'Cancelled')
        cancelled_appointments = Appointment.objects.filter(status='Cancelled').order_by('-appointment_date')

        emergency = Appointment.objects.filter(priority='Emergency').order_by('-appointment_date') 

        # Structure the response data
        response_data = {
            "all_appointments": list(all_appointments.values()),
            "completed_appointments": list(completed_appointments.values()),
            "cancelled_appointments": list(cancelled_appointments.values()),
            "scheduled_appointments": list(scheduled_appointments.values()),
            "high_priority": list(emergency.values()),
        }

        # Return the response as a JsonResponse
        return JsonResponse(response_data)

    except Exception as e:
        # Handle any exceptions that occur
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def fetch_appointments_history(request):


    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JsonResponse({"error": "Authorization token is missing"}, status=400)

        token = auth_header.split()[1]  # Extract token from header
        
        # Introspection URL for Keycloak token verification
        introspection_url = f'{settings.KEYCLOAK_SERVER_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect'
        
        # Prepare the introspection request payload
        data = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "token": token
        }

        # Make the introspection request to Keycloak
        response = requests.post(introspection_url, data=data)

        # If the response is not successful, return an error
        if response.status_code != 200 or response.json().get("active") is not True:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # Extract patient_id from request parameters
        body = json.loads(request.body)
        patient_id = body.get("patient_id")

        print(patient_id)

        if not patient_id:
            return JsonResponse({"error": "patient_id is required"}, status=400)

        # Fetch all appointments for the given patient_id
        appointments = Appointment.objects.filter(patient_id=patient_id).order_by('-appointment_date')

        # Structure the response data
        response_data = {
            "appointments": list(appointments.values()),
        }

        # Return the response as a JsonResponse
        return JsonResponse(response_data)

    except Exception as e:
        # Handle any exceptions that occur
        return JsonResponse({"error": str(e)}, status=500)        



@csrf_exempt
def update_appointment(request):
    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JsonResponse({"error": "Authorization token is missing"}, status=400)
        
        token = auth_header.split()[1]  # Extract token from header
        
        # Introspection URL for Keycloak token verification
        introspection_url = f'{settings.KEYCLOAK_SERVER_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect'
        
        # Prepare the introspection request payload
        data = {
            "client_id": settings.KEYCLOAK_CLIENT_ID,
            "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
            "token": token
        }
        
        # Make the introspection request to Keycloak
        response = requests.post(introspection_url, data=data)
        
        if response.status_code == 200:
            token_data = response.json()
            
            if token_data.get("active"):
                # Token is valid, proceed with updating the appointment
                data = json.loads(request.body)

                appointment_id  =  data.get('id')

                print(appointment_id)
                
                try:
                    appointment = Appointment.objects.get(id=appointment_id)
                    
                    # Update appointment fields
                    appointment.patient_id = data.get('patient_id', appointment.patient_id)
                    appointment.doctor_id = data.get('doctor_id', appointment.doctor_id)
                    appointment.status = data.get('status', appointment.status)
                    appointment.appointment_date = data.get('appointment_date', appointment.appointment_date)
                    appointment.appointment_time = data.get('appointment_time', appointment.appointment_time)
                    appointment.reason = data.get('reason', appointment.reason)
                    
                    appointment.save()
                    
                    # Retrieve user associated with the token
                    user_data = token_data.get('sub')
                    user = 'replace_with_user_fetch_logic'  # Replace with actual user fetch logic
                    
                    
                    return JsonResponse({'success': True, 'appointment_id': appointment.id})
                    
                except Appointment.DoesNotExist:
                    return JsonResponse({"error": "Appointment not found"}, status=404)
                
            else:
                return JsonResponse({"error": "Invalid or expired token"}, status=401)
        else:
            return JsonResponse({"error": "Error validating token with Keycloak"}, status=500)

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)
