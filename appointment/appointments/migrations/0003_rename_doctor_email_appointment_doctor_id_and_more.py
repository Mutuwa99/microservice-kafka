# Generated by Django 5.0.1 on 2025-02-21 03:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_remove_appointment_doctor_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='doctor_email',
            new_name='doctor_id',
        ),
        migrations.RenameField(
            model_name='appointment',
            old_name='patient_email',
            new_name='patient_id',
        ),
    ]
