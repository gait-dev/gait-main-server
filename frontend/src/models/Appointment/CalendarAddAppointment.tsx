import React, { useEffect, useState } from "react";
import GenericModal from "../../components/common/GenericModal";
import TimePicker from "../../components/Date/TimePicker";
import DatePicker from "../../components/Date/DatePicker";
import { PatientDropdown } from "../Patient";
import dayjs from "dayjs";
import { Appointment, Patient } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const [patient, setPatient] = useState(-1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState(daySelected);
  const [endDate, setEndDate] = useState(daySelected.add(30, "minutes"));
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Appointment>();

  const handleClose = () => {
    onClose();
  };

  const startDateSelected = (date: dayjs.Dayjs) => {
    startDate.set("year", date.year());
    startDate.set("month", date.month());
    startDate.set("day", date.day());
    setStartDate(startDate);
  };

  const startTimeSelected = (time: dayjs.Dayjs) => {
    startDate.set("hour", time.hour());
    startDate.set("minute", time.minute());
    startDate.set("second", time.second());
    setStartDate(startDate);
  };

  const endDateSelected = (date: dayjs.Dayjs) => {
    endDate.set("year", date.year());
    endDate.set("month", date.month());
    endDate.set("day", date.day());
    setEndDate(endDate);
  };

  const endTimeSelected = (time: dayjs.Dayjs) => {
    endDate.set("hour", time.hour());
    endDate.set("minute", time.minute());
    endDate.set("second", time.second());
    setEndDate(endDate);
  };

  const onSubmit: SubmitHandler<Appointment> = async (newAppointment) => {
    console.log("Submitted Appointment Data:", newAppointment);
    handleClose();
  };

  useEffect(() => {
    if (selectedPatient) setPatient(selectedPatient.id);
  }, [selectedPatient]);

  return (
    <GenericModal
      isOpen={show}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      gridWidth={3}
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
        <div
          className={`md:col-span-2 ${
            errors.patient ? "border rounded border-red-500" : ""
          }`}
        >
          <PatientDropdown
            onPatientSelected={setSelectedPatient}
          ></PatientDropdown>

          <input
            value={patient}
            className="hidden"
            hidden={true}
            autoComplete="off"
            type="number"
            {...register("patient", {
              required: "Patient is required",
            })}
          ></input>
        </div>
        {errors.patient && (
          <p className="text-red-500 text-sm mt-1">{errors.patient.message}</p>
        )}
        <div className="md:col-span-2">REndez vous</div>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Start date
          </label>
        </div>

        <div className="md:col-span-2">
          <DatePicker
            value={daySelected}
            error={errors.start != undefined}
            errorMessage={
              errors.start && errors.start.message ? errors.start.message : ""
            }
            onDateSelected={startDateSelected}
          ></DatePicker>
        </div>

        <div className="md:col-span-2">
          <TimePicker
            value={daySelected}
            error={errors.start != undefined}
            errorMessage={
              errors.start && errors.start.message ? errors.start.message : ""
            }
            onTimeSelected={startTimeSelected}
          ></TimePicker>
        </div>

        <input
          className="hidden"
          hidden={true}
          autoComplete="off"
          type="text"
          value={startDate.format("DD/MM/YYYYTHH:mm")}
          id="start"
          {...register("start", {
            required: "Start date is required",
            valueAsDate: true,
          })}
        ></input>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            End date
          </label>
        </div>

        <div className="md:col-span-2">
          <DatePicker
            value={daySelected}
            error={errors.end != undefined}
            errorMessage={
              errors.end && errors.end.message ? errors.end.message : ""
            }
            onDateSelected={endDateSelected}
          ></DatePicker>
        </div>

        <div className="md:col-span-2">
          <TimePicker
            value={daySelected.add(30, "minutes")}
            error={errors.end != undefined}
            errorMessage={
              errors.end && errors.end.message ? errors.end.message : ""
            }
            onTimeSelected={endTimeSelected}
          ></TimePicker>
        </div>

        <input
          className="hidden"
          hidden={true}
          autoComplete="off"
          type="text"
          value={endDate.format("DD/MM/YYYYTHH:mm")}
          id="end"
          {...register("end", {
            required: "End date is required",
            valueAsDate: true,
          })}
        ></input>

        <div className="md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold">
            Description
          </label>
          <textarea
            rows={10}
            className="p-2.5 w-full text-sm text-gray-400 rounded-lg border"
            placeholder="Description"
            {...register("description")}
          ></textarea>
        </div>

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </>
    </GenericModal>
  );
};

export default CalendarAddAppointment;
