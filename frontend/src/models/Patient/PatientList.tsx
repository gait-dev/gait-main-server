import React, { useState, useEffect } from 'react';
import { Patient } from '../../utils/types';
import { fetchFromAPI } from '../../utils/api';
import { getAllFromIndexedDB, saveToIndexedDB } from '../../utils/indexeddb';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchFromAPI<Patient[]>('/patients/');
        setPatients(data);
        for (const patient of data) {
          await saveToIndexedDB('patients', patient);
        }
      } catch {
        const localData = await getAllFromIndexedDB<Patient>('patient');
        setPatients(localData);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Liste des patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
