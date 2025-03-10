from django.db import models

GENDER_CHOICES = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other'),
]

ROLE_CHOICES = [
    ('admin', 'Admin'),
    ('doctor', 'Doctor'),
    ('nurse', 'Nurse'),
    ('patient', 'Patient'),
]

class UserAnalytics(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(null=True, blank=True)
    id_number = models.CharField(max_length=13, unique=True, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "User Analytics"
        verbose_name_plural = "User Analytics"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


class AppointmentAnalytics(models.Model):
    user_email = models.EmailField(null=True, blank=True)  # Store user email instead of ForeignKey
    user_id_number = models.CharField(max_length=13, null=True, blank=True)  # Store ID number if available
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'), 
        ('completed', 'Completed'), 
        ('canceled', 'Canceled')
    ])
    doctor_name = models.CharField(max_length=255)
    reason = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Appointment Analytics"
        verbose_name_plural = "Appointment Analytics"

    def __str__(self):
        return f"Appointment for {self.user_email} on {self.appointment_date}"
