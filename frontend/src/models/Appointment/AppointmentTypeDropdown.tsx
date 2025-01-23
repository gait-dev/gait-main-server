import React, { useState } from "react";
import { fetchFromAPI } from "../../utils/api"; // Assurez-vous d'avoir une fonction générique fetchFromAPI
import GenericDropdown from "../../components/common/GenericDropdown"; // Réutilisez GenericDropdown
import AppointmentTypeModal from "./AppointmentTypeModal";
import { AppointmentType } from "../../utils/types";

const fetchAppointmentType = async (): Promise<AppointmentType[]> => {
  let appointments = await fetchFromAPI<AppointmentType[]>(
    "/appointments_types/"
  );
  return appointments;
};

interface AppointmentTypeDropdownProps {
  onAppointmentTypeSelected: (type: AppointmentType) => void;
}

const AppointmentTypeDropdown: React.FC<AppointmentTypeDropdownProps> = ({
  onAppointmentTypeSelected,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointmentType, setAppointmentType] = useState<
    AppointmentType | undefined
  >(undefined);

  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    console.log("Selected appointment type:", type);
    setAppointmentType(type);
    onAppointmentTypeSelected(type);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AppointmentTypeModal
        show={showModal}
        onClose={handleCloseModal}
        onAppointmentTypeCreated={(newType) => {
          console.log("New Appointment Type:", newType);
          handleCloseModal();
        }}
      />
      <GenericDropdown<AppointmentType>
        fetchData={fetchAppointmentType}
        onSelect={handleAppointmentTypeSelect}
        searchFields={["name", "description"]}
        displayField="name"
        placeholder="Select an appointment type..."
        addNewModal={handleAddNew}
        updateElement={appointmentType}
      />
    </>
  );
};

export default AppointmentTypeDropdown;
