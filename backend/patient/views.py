from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import  Patient
from .serializers import  PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filtrer les patients par le podiatrist connecté
        return Patient.objects.filter(podiatrist=self.request.user) 
