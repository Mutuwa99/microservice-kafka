# Generated by Django 5.0.1 on 2025-02-22 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytic', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointmentanalytics',
            name='user',
        ),
        migrations.AddField(
            model_name='appointmentanalytics',
            name='user_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='appointmentanalytics',
            name='user_id_number',
            field=models.CharField(blank=True, max_length=13, null=True),
        ),
    ]
