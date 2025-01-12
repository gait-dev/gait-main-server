from rest_framework import viewsets
from .models import Examination, ExaminationStep
from .serializers import ExaminationSerializer, ExaminationStepSerializer

class ExaminationViewSet(viewsets.ModelViewSet):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer

class ExaminationStepViewSet(viewsets.ModelViewSet):
    queryset = ExaminationStep.objects.all()
    serializer_class = ExaminationStepSerializer