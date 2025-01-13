import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import AppointmentForm from './AppointmentForm';


// Type pour les rendez-vous
interface Appointment {
  id: number;
  patientName: string;
  start: Date;
  end: Date;
  description: string;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null); // Slot sélectionné
  const [showForm, setShowForm] = useState(false); // Contrôle de l'affichage du formulaire

  // Charger les rendez-vous depuis le backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get<Appointment[]>('/appointments/');
        const formattedAppointments = response.data.map((appointment) => ({
          ...appointment,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
        }));
        setAppointments(formattedAppointments);
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous :', err);
      }
    };
    fetchAppointments();
  }, []);

  // Gestion du clic sur un créneau horaire
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo.start); // Définir la date et l'heure du slot sélectionné
    setShowForm(true); // Afficher le formulaire d'ajout
  };

  // Ajouter un rendez-vous à la liste après ajout réussi
  const handleAddAppointment = () => {
    setShowForm(false); // Cacher le formulaire
    // Recharger les rendez-vous pour inclure le nouveau
    axiosInstance.get<Appointment[]>('/appointments/').then((response) => {
      const formattedAppointments = response.data.map((appointment) => ({
        ...appointment,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      }));
      setAppointments(formattedAppointments);
    });
  };

  return (
    <div>
      <h1>Calendrier des rendez-vous</h1>
      

      {/* Formulaire d'ajout de rendez-vous */}
      {showForm && selectedSlot && (
        <div>
          <h2>Ajouter un rendez-vous</h2>
          <AppointmentForm
            onSubmitSuccess={handleAddAppointment}
            initialDate={selectedSlot} // Passer la date sélectionnée au formulaire
          />
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
