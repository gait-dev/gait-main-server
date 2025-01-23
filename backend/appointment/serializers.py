from rest_framework import serializers
from .models import Appointment, AppointmentType

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentType
        fields = '__all__'