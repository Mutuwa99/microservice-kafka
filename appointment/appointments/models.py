from django.db import models

class Appointment(models.Model):
    PRIORITY_CHOICES = [
        ('Emergency', 'Emergency'),
        ('Normal', 'Normal'),
    ]

    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    patient_id = models.EmailField(null=True)  # Reference to User Management service (email)
    doctor_id = models.EmailField(null=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Normal')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField()

    def __str__(self):
        return f"Appointment ({self.status}) on {self.appointment_date} for patient {self.patient_id}"
