import React, { useEffect, useState } from "react";
import GenericModal from "../../components/common/GenericModal";
import TimePicker from "../../components/Date/TimePicker";
import DatePicker from "../../components/Date/DatePicker";
import { PatientDropdown } from "../Patient";
import dayjs from "dayjs";
import { Patient } from "../../utils/types";

interface CalendarAddAppointmentContext {
  daySelected: dayjs.Dayjs;
  show: boolean;
  onClose: () => void;
}

const CalendarAddAppointment: React.FC<CalendarAddAppointmentContext> = ({
  daySelected,
  show,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(daySelected);
  const [endDate, setEndDate] = useState(daySelected.add(30, "minutes"));
  const [description, setDescription] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    const appointmentData = {
      patient,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description,
    };
    console.log("Submitted Appointment Data:", appointmentData);
    handleClose();
  };

  return (
    <GenericModal
      isOpen={show}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Add Appointment"
      description="Fill out the form to schedule a new appointment."
      submitLabel="Save"
      cancelLabel="Cancel"
    >
      {/* Contenu principal */}
      <>
        {/* Patient Selection */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold">
            Patient
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold">
            Rendez vous
          </label>
        </div>
        <div className="md:col-span-2">
          <PatientDropdown></PatientDropdown>
        </div>
        <div className="md:col-span-2">REndez vous</div>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Start date
          </label>
        </div>

        <div className="md:col-span-2">
          <DatePicker value={daySelected}></DatePicker>
        </div>

        <div className="md:col-span-2">
          <TimePicker value={daySelected}></TimePicker>
        </div>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            End date
          </label>
        </div>

        <div className="md:col-span-2">
          <DatePicker value={daySelected}></DatePicker>
        </div>

        <div className="md:col-span-2">
          <TimePicker value={daySelected.add(30, "minutes")}></TimePicker>
        </div>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Description
          </label>
          <textarea
            rows={10}
            className="p-2.5 w-full text-sm text-gray-400 rounded-lg border"
            placeholder="Description"
          ></textarea>
        </div>
      </>
    </GenericModal>
  );
};

export default CalendarAddAppointment;
