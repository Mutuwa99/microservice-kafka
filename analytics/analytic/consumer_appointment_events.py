import os
import logging
import django
from kafka import KafkaConsumer
import json
from datetime import datetime

# Set up logging
log_file = os.path.join(os.path.dirname(__file__), "appointment_consumer.log")

logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# Initialize Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'analytics.settings')
django.setup()

from analytic.models import AppointmentAnalytics

# Initialize Kafka consumer
appointment_consumer = KafkaConsumer(
    'appointment-events',
    bootstrap_servers='kafka:9092',
    value_deserializer=lambda v: json.loads(v.decode('utf-8')),
    auto_offset_reset='earliest',
    group_id='appointment-events-consumer'
)

logging.info("📢 Appointment Events Consumer started. Listening for new appointment events...")

def save_appointment_to_db(appointment_data):
    try:
        # Convert appointment date + time into a single DateTimeField
        appointment_datetime = datetime.strptime(
            f"{appointment_data['appointment_date']} {appointment_data['appointment_time']}", 
            "%Y-%m-%d %H:%M:%S"
        )

        # Save to the AppointmentAnalytics model
        AppointmentAnalytics.objects.create(
            user_email=appointment_data.get("patient_id"),  # Store patient email
            appointment_date=appointment_datetime,
            status=appointment_data.get("status", "").lower(),  # Ensure lowercase status
            doctor_name=appointment_data.get("doctor_id"),  # Store doctor_id (email for now)
        )

        logging.info(f"✅ Appointment saved: {appointment_data['appointment_id']} for {appointment_data['patient_id']} at {appointment_datetime}.")
    except Exception as e:
        logging.error(f"❌ Error saving appointment: {e}")

# Process Kafka messages
for message in appointment_consumer:
    try:
        appointment_data = message.value  # Extract JSON event data
        logging.info(f"📥 Received Kafka message: {appointment_data}")

        if appointment_data:
            save_appointment_to_db(appointment_data)
            logging.info(f"✅ Successfully processed appointment event: {appointment_data['appointment_id']}")
        else:
            logging.warning("⚠️ Received empty appointment event.")
    except Exception as e:
        logging.error(f"❌ Error processing appointment event: {e}")
