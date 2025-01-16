import React, { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";

interface AppointmentFormProps {
  initialDate?: Date; // Date initiale passée par le calendrier
  onSubmitSuccess?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDate,
  onSubmitSuccess,
}) => {
  const [date, setDate] = useState(
    initialDate ? initialDate.toISOString().slice(0, 16) : ""
  ); // Convertir en datetime-local

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/appointments/", {
        // Les autres champs nécessaires ici...
        date,
      });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error("Erreur lors de l’ajout du rendez-vous :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ pour la date */}
      <div>
        <label>Date :</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AppointmentForm;
