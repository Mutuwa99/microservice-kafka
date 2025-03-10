import os
import django
from kafka import KafkaConsumer
import json

# Initialize Django settings and setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'analytics.settings')  # Replace with your project settings path
django.setup()  # Initialize Django

from analytic.models import UserAnalytics  # Import UserAnalytics model

# Initialize Kafka consumer for user registrations
user_consumer = KafkaConsumer(
    'user-registrations',  # Kafka topic for user registrations
    bootstrap_servers='localhost:9092',  # Kafka broker address
    value_deserializer=lambda v: json.loads(v.decode('utf-8')),
    auto_offset_reset='earliest',  # Start reading from the earliest messages
    group_id='user-registration-consumer'  # Consumer group name
)

print("User Registration Consumer: Listening for new user registrations...")

# Function to save user data to the UserAnalytics table
def save_user_to_db(user_data):
    # Check if the user already exists in the DB, otherwise create a new one
    user, created = UserAnalytics.objects.get_or_create(
        email=user_data.get("email"),
        defaults={
            'first_name': user_data.get("first_name"),
            'last_name': user_data.get("last_name"),
            'age': user_data.get("age"),
            'id_number': user_data.get("id_number"),
            'gender': user_data.get("gender"),
            'phone_number': user_data.get("phone_number"),
            'role': user_data.get("role"),
        }
    )
    if created:
        print(f"User {user.first_name} {user.last_name} added to the database.")
    return user  # Return the user object (either new or existing)

# Function to handle user registration messages
def handle_user_registration_message(message):
    try:
        user_data = message.value
        if user_data:
            # Save the user to the database
            save_user_to_db(user_data)
        else:
            print("Missing user data in the user-registration message.")
    except Exception as e:
        print(f"Error processing user registration message: {e}")

# Listen for messages on the user-registration topic
for message in user_consumer:
    handle_user_registration_message(message)
