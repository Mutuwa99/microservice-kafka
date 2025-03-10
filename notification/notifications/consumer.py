import os
from django.core.wsgi import get_wsgi_application
import django
from kafka import KafkaConsumer
import json
from django.core.mail import send_mail


# Initialize Django settings and setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notification.settings')  # Replace with your actual project settings path
application = get_wsgi_application()

from .models import Registration_Notification
from .models import Appointment_Notification

# Initialize the Kafka consumer
consumer = KafkaConsumer(
    'user-registrations',  # Replace with your actual Kafka topic name
    bootstrap_servers='localhost:9092',  # Kafka broker address
    value_deserializer=lambda v: json.loads(v.decode('utf-8')),
    auto_offset_reset='earliest',  # Start reading from the earliest messages
    group_id='notifications-consumer'  # Consumer group name
)

print("Notification Service: Listening for new user registrations...")


# Function to send the notification and save to DB
def send_notification_reg(user_data):
    notification = Registration_Notification.objects.create(
        user_email=user_data["email"],
        message=f"Welcome {user_data['email']}! Your account has been created.",
        status="sent"
    )
    print(f"📩 Sent notification to {user_data['email']}!")

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
                    <h3>Hello <strong>{user_data['email']}</strong>,</h3>
                    <p>We're excited to inform you that your account has been successfully created! Please find the details below:</p>
                    <ul>
                        <li><strong>First Name :</strong> {user_data.get('first_name', 'N/A')}</li>
                        <li><strong>Last Name  Time:</strong> {user_data.get('last_name', 'N/A')}</li>
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

    send_mail(
        'User Registration Notification',
        f"Hi {user_data['email']}! Your account has been  has been created.",
        'your-email@gmail.com',  # Replace with your email address
        [user_data["email"]],  # The recipient's email
        fail_silently=False,
        html_message=html_message  # The HTML body of the email
    )
# Listen for new messages
for message in consumer:
    send_notification_reg(message.value)

