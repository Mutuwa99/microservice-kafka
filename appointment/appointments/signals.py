from django.db.models.signals import post_save
from django.dispatch import receiver
from kafka import KafkaProducer
import json
from .models import Appointment

# Initialize Kafka producer globally and ensure it's initialized once
producer = None

def initialize_producer():
    global producer
    if producer is None:
        producer = KafkaProducer(
            bootstrap_servers='kafka:9092',  # Kafka broker address
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )

# Signal handler for appointment creation
@receiver(post_save, sender=Appointment)
def send_appointment_created_event(sender, instance, created, **kwargs):
    try:
        # Log the type of instance for debugging
    
        
        if created:
            # Ensure producer is initialized before sending the message
            initialize_producer()

            # Log the type after processing
            print(f"Type of instance after initialization: {type(instance)}")
            
            # Create the message to be sent to the Kafka topic
            message = {
                "appointment_id": instance.id,
                "patient_id": instance.patient_id,
                "doctor_id": instance.doctor_id,
                "status": instance.status,
                "appointment_date": str(instance.appointment_date),
                "appointment_time": str(instance.appointment_time)
            }

            # Log the message before sending to Kafka for debugging
            print(f"Message to send: {message}")
            
            # Send the message to the 'appointment-events' topic
            producer.send('appointment-events', value=message)
            print(f"Sent appointment event for {instance.id}")
    
    except Exception as e:
        print(f"Error sending appointment event: {e}")
