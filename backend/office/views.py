from rest_framework import viewsets
from .models import Office
from .serializers import OfficeSerializer

class OfficeViewSet(viewsets.ModelViewSet):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer