import os
import django
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.management import call_command
from django.conf import settings
from datetime import datetime, timedelta

def reset_database():
    # Supprimer la base de données existante si vous utilisez SQLite
    db_path = settings.DATABASES['default']['NAME']
    if os.path.exists(db_path):
        print(f"Suppression de la base de données à {db_path}")
        os.remove(db_path)

    # Supprimer les fichiers de migration dans vos applications
    apps = ['api', 'appointment', 'examination', 'office', 'patient', 'podiatrist']  # Remplacez par les noms de vos applications
    for app in apps:
        migrations_dir = os.path.join(settings.BASE_DIR, app, 'migrations')
        if os.path.exists(migrations_dir):
            for filename in os.listdir(migrations_dir):
                if filename != '__init__.py' and filename.endswith('.py'):
                    file_path = os.path.join(migrations_dir, filename)
                    print(f"Suppression du fichier de migration {file_path}")
                    os.remove(file_path)

    # Recréer les migrations
    print("Création des migrations...")
    call_command('makemigrations')
    print("Application des migrations...")
    call_command('migrate')

def create_superuser():
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        print("Création du super-utilisateur...")
        User.objects.create_superuser(
            username='admin',
            email='admin@gait.care',
            password='adminpass',
            full_name='Admin User'  # Ajoutez des champs supplémentaires si nécessaire
        )
    else:
        print("Le super-utilisateur existe déjà.")

def populate_database():
    print("Peuplement de la base de données avec des données d'exemple...")
    from podiatrist.models import Podiatrist
    from office.models import Office
    from patient.models import Patient
    from appointment.models import Appointment
    from examination.models import Examination, ExaminationStep

    # Créer un Cabinet (Office)
    office, created = Office.objects.get_or_create(
        name="Main Office",
        defaults={
            'address': "123 Podology Street, Health City",
            'logo': None  # Ajoutez un fichier si nécessaire
        }
    )
    print(f"Cabinet : {office}")

    # Créer un Podologue (Podiatrist)
    Podiatrist = get_user_model()
    podiatrist, created = Podiatrist.objects.get_or_create(
        username="podiatrist1",
        defaults={
            'full_name': "Dr. Jane Doe",
            'email': "jane.doe@example.com",
            'password': make_password("password123"),
            'office': office
        }
    )
    print(f"Podologue : {podiatrist}")

    # Créer des Patients
    patients_data = [
        {
            'name': "John Smith",
            'address': "456 Elm Street, Health City",
            'phone': "123456789",
            'email': "john.smith@example.com",
            'podiatrist': podiatrist
        },
        {
            'name': "Emily Johnson",
            'address': "789 Oak Avenue, Health City",
            'phone': "987654321",
            'email': "emily.johnson@example.com",
            'podiatrist': podiatrist
        }
    ]

    patients = []
    for patient_data in patients_data:
        patient, created = Patient.objects.get_or_create(
            name=patient_data['name'],
            defaults=patient_data
        )
        patients.append(patient)
    print(f"Patients : {patients}")

    # Créer des Rendez-vous (Appointments)
    appointments_data = [
        {
            'patient': patients[0],
            'start': datetime.now() + timedelta(days=1),
            'end': datetime.now() + timedelta(days=1,minutes=30),
            'description': "Visite de contrôle",
            'type': "Contrôle"
        },
        {
            'patient': patients[1],
            'start': datetime.now() + timedelta(days=2),
            'end': datetime.now() + timedelta(days=2,minutes=30),
            'description': "Suivi après traitement",
            'type': "Suivi"
        }
    ]

    appointments = []
    for appointment_data in appointments_data:
        appointment, created = Appointment.objects.get_or_create(
            patient=appointment_data['patient'],
            start=appointment_data['start'],
            end=appointment_data['end'],
            defaults=appointment_data
        )
        appointments.append(appointment)
    print(f"Rendez-vous : {appointments}")

    # Créer des Examens (Examinations)
    examinations = []
    for appointment in appointments:
        examination, created = Examination.objects.get_or_create(
            appointment=appointment,
            defaults={
                'patient': appointment.patient,
                'description': "Examen dérivé du rendez-vous"
            }
        )
        examinations.append(examination)
    print(f"Examens : {examinations}")

    # Créer des Étapes d'Examen (Examination Steps)
    steps_data = [
        {
            'examination': examinations[0],
            'step_description': "Observation initiale"
        },
        {
            'examination': examinations[0],
            'step_description': "Analyse radiographique"
        },
        {
            'examination': examinations[1],
            'step_description': "Inspection physique"
        }
    ]

    steps = []
    for step_data in steps_data:
        step, created = ExaminationStep.objects.get_or_create(
            examination=step_data['examination'],
            step_description=step_data['step_description']
        )
        steps.append(step)
    print(f"Étapes d'examen : {steps}")

    print("Peuplement de la base de données terminé !")

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Remplacez 'myproject' par le nom de votre projet
    django.setup()

    reset_database()
    create_superuser()
    populate_database()
