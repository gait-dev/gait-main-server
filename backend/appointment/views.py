from rest_framework import viewsets
from .models import Appointment, AppointmentType
from .serializers import AppointmentSerializer, AppointmentTypeSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentTypeViewSet(viewsets.ModelViewSet):
    queryset = AppointmentType.objects.all()
    serializer_class = AppointmentTypeSerializer