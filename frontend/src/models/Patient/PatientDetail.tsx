import React, { useState, useEffect } from 'react';
import { Patient } from '../../utils/types';
import { fetchFromAPI } from '../../utils/api';
import { getFromIndexedDB, saveToIndexedDB } from '../../utils/indexeddb';

interface PatientDetailProps {
  patientId: number;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patientId }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatient() {
      try {
        const data = await fetchFromAPI<Patient>(`/patient/${patientId}`);
        setPatient(data);
        await saveToIndexedDB('patients', data);
      } catch {
        const localData = await getFromIndexedDB<Patient>('patients', patientId);
        setPatient(localData || null);
      } finally {
        setLoading(false);
      }
    }
    loadPatient();
  }, [patientId]);

  if (loading) return <div>Chargement...</div>;
  if (!patient) return <div>Patient introuvable</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>Email : {patient.email}</p>
      <p>Adresse : {patient.address}</p>
    </div>
  );
};

export default PatientDetail;
