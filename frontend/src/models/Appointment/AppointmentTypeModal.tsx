import React from "react";
import GenericModal from "../../components/common/GenericModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppointmentType } from "../../utils/types";
import { saveToAPI } from "../../utils/api";

interface AppointmentTypeModalProps {
  show: boolean;
  onClose: () => void;
  onAppointmentTypeCreated: (appointmentType: AppointmentType) => void;
}

const AppointmentTypeModal: React.FC<AppointmentTypeModalProps> = ({
  show,
  onClose,
  onAppointmentTypeCreated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentType>();

  const onSubmit: SubmitHandler<AppointmentType> = async (
    newAppointmentType
  ) => {
    try {
      const newType = await saveToAPI<AppointmentType>(newAppointmentType);
      onAppointmentTypeCreated(newType);
    } catch (err) {
      console.error("Failed to create appointment type:", err);
    }
  };

  return (
    <GenericModal
      isOpen={show}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Add Appointment Type"
      description="Fill out the details for the new appointment type."
      submitLabel="Save"
      cancelLabel="Cancel"
      gridWidth={1}
    >
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`block w-full border rounded py-2 px-3 mt-1 text-sm ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={3}
            {...register("description")}
            className="block w-full border rounded py-2 px-3 mt-1 text-sm"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="color"
            {...register("color", { required: "Color is required" })}
            className="block w-full mt-1"
          />
          {errors.color && (
            <p className="text-red-500 text-sm">{errors.color.message}</p>
          )}
        </div>
      </form>
    </GenericModal>
  );
};

export default AppointmentTypeModal;
