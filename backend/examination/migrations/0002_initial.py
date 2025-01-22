# Generated by Django 5.1.4 on 2025-01-22 12:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('examination', '0001_initial'),
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='examination',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='examinations', to='patient.patient'),
        ),
        migrations.AddField(
            model_name='examinationstep',
            name='examination',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='examination.examination'),
        ),
    ]
