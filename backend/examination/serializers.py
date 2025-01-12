from rest_framework import serializers
from .models import Examination, ExaminationStep

class ExaminationStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExaminationStep
        fields = '__all__'

class ExaminationSerializer(serializers.ModelSerializer):
    steps = ExaminationStepSerializer(many=True, read_only=True)

    class Meta:
        model = Examination
        fields = '__all__'

