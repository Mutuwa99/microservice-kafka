import os
import logging
from django.core.wsgi import get_wsgi_application
import django
from kafka import KafkaConsumer
import json
from django.core.mail import send_mail

# Set up logging
log_file = os.path.join(os.path.dirname(__file__), "notification_service.log")

logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# Initialize Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notification.settings")
application = get_wsgi_application()

from .models import Appointment_Notification

# Initialize Kafka Consumer
consumer = KafkaConsumer(
    "appointment-events",
    bootstrap_servers="kafka:9092",
    value_deserializer=lambda v: json.loads(v.decode("utf-8")),
    auto_offset_reset="earliest",
    group_id="notifications-consumer",
)

logging.info("Notification Service started. Listening for new appointments...")

def send_notification_app(user_data):
    """Sends appointment notification and logs the event."""
    try:
        notification = Appointment_Notification.objects.create(
            user_email=user_data["patient_id"],
            message=f"Hi {user_data['patient_id']}! Your appointment has been set.",
            status="sent",
        )
        
        logging.info(f"📩 Sent notification to {user_data['patient_id']}!")

        html_message = f"""
        <html>
            <head>
                <style>
                    body {{
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f6f9;
                        margin: 0;
                        padding: 20px;
                    }}
                    .container {{
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 30px;
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                        max-width: 650px;
                        margin: 0 auto;
                        background: linear-gradient(135deg, #6fa3f7, #007bff);
                        color: #ffffff;
                    }}
                    .header {{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #ffffff;
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                    }}
                    .header h2 {{
                        font-size: 28px;
                        color: #ffffff;
                    }}
                    .header img {{
                        width: 50px;
                        height: 50px;
                    }}
                    .body-content {{
                        color: #ffffff;
                        font-size: 16px;
                        line-height: 1.6;
                    }}
                    .body-content strong {{
                        color: #ffffff;
                    }}
                    ul {{
                        list-style-type: none;
                        padding: 0;
                    }}
                    li {{
                        margin: 10px 0;
                        font-size: 16px;
                    }}
                    .footer {{
                        margin-top: 30px;
                        text-align: center;
                        font-size: 14px;
                        color: #888888;
                    }}
                    .footer a {{
                        color: #ffffff;
                        text-decoration: none;
                    }}
                    .button {{
                        background-color: #007bff;
                        color: white;
                        padding: 12px 25px;
                        font-size: 16px;
                        border: none;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        margin-top: 20px;
                    }}
                    .button:hover {{
                        background-color: #0056b3;
                    }}
                    .quote {{
                        font-style: italic;
                        color: #ffffff;
                        background-color: #007bff;
                        padding: 15px;
                        margin-top: 30px;
                        border-radius: 5px;
                        text-align: center;
                        font-size: 18px;
                    }}

                    .header img {{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%; /* Makes the image round */
                    object-fit: cover; /* Ensures the image fills the circle without distortion */
                }}
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Header Section with Logo and Title -->
                    <div class="header">
                        <img src="https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1086216%2F0fcbdef0-d631-4023-8747-ff6e14bd027e.jpeg" alt="Notification Microservice Logo" />
                        <h4 style="margin-left:5px">Noble Mutuwa's Notification Microservice</h4>
                    </div>

                    <!-- Body Content Section -->
                    <div class="body-content">
                        <h3>Hello <strong>{user_data['patient_id']}</strong>,</h3>
                        <p>We're excited to inform you that your Appointment has been set :</p>
                        <ul>
                            <li><strong>Date :</strong> {user_data.get('appointment_date', 'N/A')}</li>
                            <li><strong>Time:</strong> {user_data.get('appointment_time', 'N/A')}</li>
                        </ul>

                        <p>Looking forward to seeing you soon!</p>
                    </div>

                    <!-- Call-to-Action Button -->
                    <a href="#" class="button">View Your Appointment</a>

                    <!-- Quote Section -->
                    <div class="quote">
                        "Your health is our priority! Thank you for choosing our services."
                    </div>

                    <!-- Footer Section with Support Links -->
                    <div class="footer">
                        <p>Best regards, <br /> The Appointment Team</p>
                        <p><a href="mailto:support@example.com">Contact Support</a> | <a href="https://www.example.com">Visit Our Website</a></p>
                    </div>
                </div>
            </body>
        </html>
            """   

        # Send email notification
        send_mail(
            "Appointment Notification",
            f"Hi {user_data['patient_id']}! Your appointment has been set.",
            "your-email@gmail.com",
            [user_data["patient_id"]],
            fail_silently=False,
            html_message=html_message  # The HTML body of the email
        )

        logging.info(f"📧 Email sent to {user_data['patient_id']}!")
    
    except Exception as e:
        logging.error(f"❌ Error sending notification: {e}")

# Start Kafka consumer loop
for message in consumer:
    logging.info(f"📥 Received Kafka message: {message.value}")
    try:
        send_notification_app(message.value)
        logging.info(f"✅ Successfully processed notification for {message.value['patient_id']}")
    except Exception as e:
        logging.error(f"❌ Failed to process notification for {message.value['patient_id']}: {e}")
