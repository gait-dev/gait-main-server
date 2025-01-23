import React, { useEffect } from "react";
import GenericModal from "../../components/common/GenericModal";
import TimePicker from "../../components/Date/TimePicker";
import DatePicker from "../../components/Date/DatePicker";
import { PatientDropdown } from "../Patient";
import dayjs from "dayjs";
import { Appointment, AppointmentType, Patient } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveToAPI } from "../../utils/api";
import AppointmentTypeDropdown from "./AppointmentTypeDropdown";

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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Appointment>({
    defaultValues: {
      type: -1,
      patient: -1,
      start: daySelected.toISOString(),
      end: daySelected.add(30, "minutes").toISOString(),
      description: "",
    },
  });

  const selectedPatientId = watch("patient");
  const selectedTypeId = watch("type");
  const startDate = watch("start");
  const endDate = watch("end");

  const handleTypeSelect = (type: AppointmentType) => {
    setValue("type", type.id); // Met à jour l'ID du patient
  };
  const handlePatientSelect = (patient: Patient) => {
    setValue("patient", patient.id); // Met à jour l'ID du patient
  };

  const handleStartDateChange = (date: dayjs.Dayjs) => {
    const updatedStart = dayjs(startDate)
      .set("year", date.year())
      .set("month", date.month())
      .set("date", date.date());
    setValue("start", updatedStart.toISOString());
  };

  const handleStartTimeChange = (time: dayjs.Dayjs) => {
    const updatedStart = dayjs(startDate)
      .set("hour", time.hour())
      .set("minute", time.minute());
    setValue("start", updatedStart.toISOString());
  };

  const handleEndDateChange = (date: dayjs.Dayjs) => {
    const updatedEnd = dayjs(endDate)
      .set("year", date.year())
      .set("month", date.month())
      .set("date", date.date());
    setValue("end", updatedEnd.toISOString());
  };

  const handleEndTimeChange = (time: dayjs.Dayjs) => {
    const updatedEnd = dayjs(endDate)
      .set("hour", time.hour())
      .set("minute", time.minute());
    setValue("end", updatedEnd.toISOString());
  };

  const onSubmit: SubmitHandler<Appointment> = async (newAppointment) => {
    console.log("Submitted Appointment Data:", newAppointment);
    try {
      await saveToAPI(newAppointment);
    } catch {
      console.log("Erreur to save index");
    }
    onClose(); // Ferme la modal après soumission
  };

  useEffect(() => {
    if (selectedPatientId === -1) {
      console.warn("No patient selected!");
    }
  }, [selectedPatientId]);

  return (
    <GenericModal
      isOpen={show}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      gridWidth={3}
      title="Add Appointment"
      description="Fill out the form to schedule a new appointment."
      submitLabel="Save"
      cancelLabel="Cancel"
    >
      {/* Formulaire principal */}
      <>
        {/* Sélection du patient */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold">
            Patient
          </label>
          <PatientDropdown onPatientSelected={handlePatientSelect} />
          {errors.patient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.patient.message}
            </p>
          )}
        </div>

        {/* Sélection du type de rendez vous */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold">
            Appointment
          </label>
          <AppointmentTypeDropdown
            onAppointmentTypeSelected={handleTypeSelect}
          />
          {errors.patient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.patient.message}
            </p>
          )}
        </div>

        {/* Date et heure de début */}
        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Start date & time
          </label>
        </div>
        <div className="md:col-span-2">
          <DatePicker
            value={dayjs(startDate)}
            error={!!errors.start}
            errorMessage={
              errors.start && errors.start.message ? errors.start.message : ""
            }
            onDateSelected={handleStartDateChange}
          />
        </div>
        <div className="md:col-span-2">
          <TimePicker
            value={dayjs(startDate)}
            error={!!errors.start}
            errorMessage={
              errors.start && errors.start.message ? errors.start.message : ""
            }
            onTimeSelected={handleStartTimeChange}
          />
        </div>

        {/* Date et heure de fin */}
        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            End date & time
          </label>
        </div>
        <div className="md:col-span-2">
          <DatePicker
            value={dayjs(endDate)}
            error={!!errors.end}
            errorMessage={
              errors.end && errors.end.message ? errors.end.message : ""
            }
            onDateSelected={handleEndDateChange}
          />
        </div>
        <div className="md:col-span-2">
          <TimePicker
            value={dayjs(endDate)}
            error={!!errors.end}
            errorMessage={
              errors.end && errors.end.message ? errors.end.message : ""
            }
            onTimeSelected={handleEndTimeChange}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Description
          </label>
          <textarea
            rows={4}
            className="p-2.5 w-full text-sm text-gray-400 rounded-lg border"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </>
    </GenericModal>
  );
};

export default CalendarAddAppointment;
