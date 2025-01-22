from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Podiatrist
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import PodiatristSerializer, EmailTokenObtainPairSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

class PodiatristTokenRefreshView(TokenRefreshView):
    pass

class LoginView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        # Authentification de l'utilisateur
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            

        # Vérifie si l'utilisateur est actif
        if not user.is_active:
            return Response({"detail": "User account is disabled."}, status=status.HTTP_403_FORBIDDEN)

        # Génère les jetons JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'user' : user.pk,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blackliste le token
            return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class PodiatristViewSet(viewsets.ModelViewSet):
    queryset = Podiatrist.objects.all()
    serializer_class = PodiatristSerializer