from django.db import models

class Registration_Notification(models.Model):
    user_email = models.EmailField()
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('sent', 'Sent'), ('failed', 'Failed')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification to {self.user_email} - {self.status}"

class Appointment_Notification(models.Model):
    user_email = models.EmailField()
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('sent', 'Sent'), ('failed', 'Failed')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification to {self.user_email} - {self.status}"