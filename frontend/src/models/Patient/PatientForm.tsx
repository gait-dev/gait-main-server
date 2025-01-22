import React, { useState } from "react";
import { Patient } from "../../utils/types";
import { saveToAPI } from "../../utils/api";
import { saveToIndexedDB } from "../../utils/indexeddb";

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: "",
    email: "",
    address: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enregistrement...");

    try {
      const savedData = await saveToAPI(formData);
      await saveToIndexedDB("patients", savedData);
      setStatus("Enregistré avec succès");
    } catch {
      setStatus("Erreur lors de l’enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
        placeholder="Adresse"
      />
      <button type="submit">Enregistrer</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default PatientForm;
