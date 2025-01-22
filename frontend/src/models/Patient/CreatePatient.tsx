import React, { useState } from "react";
import GenericModal from "../../components/common/GenericModal";
import { Patient } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveToAPI } from "../../utils/api";

interface CreatePatientModalProps {
  onClose: () => void;
  onPatientCreated: (patient: Patient) => void;
  show: boolean;
}

const CreatePatientModal: React.FC<CreatePatientModalProps> = ({
  onClose,
  onPatientCreated,
  show,
}) => {
  const onSubmit: SubmitHandler<Patient> = async (newPatient) => {
    try {
      await saveToAPI(newPatient);
    } catch {
      console.log("Erreur to save index");
    }
    onPatientCreated(newPatient); // Notifie le parent
    onClose(); // Ferme la modal
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Patient>();

  return (
    <GenericModal
      isOpen={show}
      title="Add Patient"
      description="Please fill out all the fields to add a new patient."
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      gridWidth={1}
      submitLabel="Create"
      cancelLabel="Cancel"
    >
      {/* Name Field */}
      <div className="md:col-span-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          autoComplete="off"
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 150,
              message: "Name must be at most 150 characters long",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name must contain only letters and spaces",
            },
          })}
          className={`block w-full border rounded py-2 px-3 mt-1 text-sm ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="md:col-span-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          autoComplete="off"
          type="text"
          id="phone"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone must be a valid 10-digit number",
            },
          })}
          className={`block w-full border rounded py-2 px-3 mt-1 text-sm ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="md:col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          autoComplete="off"
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: "Email must be a valid email address",
            },
          })}
          className={`block w-full border rounded py-2 px-3 mt-1 text-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      {/* Address Field */}
      <div className="md:col-span-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          autoComplete="off"
          type="text"
          id="address"
          {...register("address", {
            required: "Address is required",
            maxLength: {
              value: 200,
              message: "Address must be at most 200 characters long",
            },
          })}
          className={`block w-full border rounded py-2 px-3 mt-1 text-sm ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>
    </GenericModal>
  );
};

export default CreatePatientModal;
