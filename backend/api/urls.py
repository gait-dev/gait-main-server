from django.urls import path, include
from rest_framework.routers import DefaultRouter
from office.views import OfficeViewSet
from podiatrist.views import PodiatristViewSet
from patient.views import PatientViewSet
from appointment.views import AppointmentViewSet, AppointmentTypeViewSet
from examination.views import ExaminationViewSet, ExaminationStepViewSet

from podiatrist.views import LoginView, LogoutView,EmailTokenObtainPairView,PodiatristTokenRefreshView

router = DefaultRouter()
router.register(r'offices', OfficeViewSet)
router.register(r'podiatrists', PodiatristViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'appointments_types', AppointmentTypeViewSet)
router.register(r'examinations', ExaminationViewSet)
router.register(r'examination_steps', ExaminationStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', PodiatristTokenRefreshView.as_view(), name='podiatrist_token_refresh'),


]

