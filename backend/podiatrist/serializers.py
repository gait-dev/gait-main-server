from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Podiatrist


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Ajouter des données supplémentaires dans le token si nécessaire
        token['email'] = user.email
        return token


class PodiatristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podiatrist
        fields = ['id', 'username', 'full_name', 'email', 'office']