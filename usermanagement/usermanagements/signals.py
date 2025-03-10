from django.db.models.signals import post_save
from django.dispatch import receiver
from kafka import KafkaProducer
import json
import logging
from usermanagements.models import CustomUser

# Set up logging for better debugging
logging.basicConfig(level=logging.DEBUG)  # Enable detailed logging

# Initialize Kafka producer globally
producer = None

# Initialize Kafka producer with error handling
def initialize_producer():
    global producer
    if producer is None:
        try:
            producer = KafkaProducer(
                bootstrap_servers='localhost:9092',  # Ensure this points to the correct Kafka broker address
                value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                linger_ms=500,  # Allow more time for batches to accumulate
                acks='all',  # Ensure full acknowledgment from Kafka
                retries=5,  # Retry sending the message if it fails
                request_timeout_ms=20000  # Increase the timeout period for requests
            )
            logging.info("Kafka producer initialized successfully")
        except Exception as e:
            logging.error(f"Error initializing Kafka producer: {e}")
            raise e  # Raise the exception to handle it appropriately

# Signal handler for sending Kafka message
@receiver(post_save, sender=CustomUser)
def send_user_created_event(sender, instance, created, **kwargs):
    try:
        # Initialize producer if it's not already initialized
        initialize_producer()

        if created:  # Only send event when a new user is created
            message = {
                "user_id": instance.id,
                "email": instance.email,
                "role": instance.role,
                "phone_number": instance.phone_number,
                "first_name": instance.first_name,
                "last_name": instance.last_name
            }

            logging.debug(f"Preparing to send message: {message}")
            if producer:  # Check if the producer is properly initialized
                future = producer.send('user-registrations', value=message)
                record_metadata = future.get(timeout=120)  # Wait for confirmation
                logging.info(f"Message sent successfully: topic={record_metadata.topic}, partition={record_metadata.partition}, offset={record_metadata.offset}")
            else:
                logging.error("Producer is not initialized.")
    except Exception as e:
        logging.error(f"Error processing user created event: {e}")
