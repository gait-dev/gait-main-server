import React, { useState } from "react";
import GenericDropdown from "../../components/common/GenericDropdown";
import { fetchFromAPI } from "../../utils/api";
import { Patient } from "../../utils/types";
import CreatePatientModal from "./CreatePatient";

const fetchPatients = async (): Promise<Patient[]> => {
  let patients = await fetchFromAPI<Patient[]>("/patients/");
  return patients;
};

interface PatientDropdownProps {
  onPatientSelected: (patient: Patient) => void;
}

const PatientDropdown: React.FC<PatientDropdownProps> = ({
  onPatientSelected,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const handlePatientSelect = (patient: Patient) => {
    console.log("Selected patient:", patient);
    setPatient(patient);
    onPatientSelected(patient);
  };

  const handleClose = () => {
    console.log("Closed");
    setShowModal(false);
  };

  const onNewPatient = () => {
    setShowModal(true);
  };

  return (
    <>
      {" "}
      <CreatePatientModal
        onPatientCreated={setPatient}
        onClose={handleClose}
        show={showModal}
      />
      <GenericDropdown<Patient>
        fetchData={fetchPatients}
        onSelect={handlePatientSelect}
        searchFields={["name", "email"]} // Remplacez par les champs de votre choix
        displayField="name"
        placeholder="Search for a patient..."
        addNewModal={onNewPatient}
        updateElement={patient}
      />
    </>
  );
};

export default PatientDropdown;
