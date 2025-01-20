import React, { useState } from "react";
import GenericDropdown from "../../components/common/GenericDropdown";
import { fetchFromAPI } from "../../utils/api";
import { Patient } from "../../utils/types";
import CreatePatientModal from "./CreatePatient";
import CreatePatient from "./CreatePatient";

const fetchPatients = async (): Promise<Patient[]> => {
  let patients = await fetchFromAPI<Patient[]>("/patients/");

  return patients;
};

const PatientDropdown: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handlePatientSelect = (patient: Patient) => {
    console.log("Selected patient:", patient);
  };

  const handlePatientCreated = (patient: Patient) => {
    console.log("Created patient:", patient);
  };

  const handleClose = () => {
    console.log("Closed");
  };

  const onNewPatient = () => {
    console.log("show modal");
    setShowModal(true);
  };

  return (
    <>
      {" "}
      <CreatePatientModal
        onPatientCreated={handlePatientCreated}
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
      />
    </>
  );
};

export default PatientDropdown;
