import { getUserPk } from "./auth";



export interface Office {
    id: number;
    name: string;
    address: string;
}

export interface Patient {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    podiatrist: number;
}

export interface Appointment {
    id: number;
    start: string;
    end: string;
    patient: number;
    type: number;
    description: string;
}

export interface AppointmentType {
    id: number;
    name: string;
    description?: string;
    color: string;
  }

function isOffice(object: any): object is Office {
    return (
        object &&
        typeof object.name === "string" &&
        typeof object.address === "string"
    );
}

function isPatient(object: any): object is Patient {
    return (
        object &&
        typeof object.name === "string" &&
        typeof object.phone === "string" &&
        typeof object.email === "string" &&
        typeof object.address === "string" &&
        typeof object.podiatrist === "number"
    );
}

export function isAppointmentType(object: any): object is AppointmentType {
    return (
      object &&
      typeof object.name === "string" &&
      (typeof object.description === "string" || typeof object.description === "undefined") &&
      typeof object.color === "string"
    );
  }

function isAppointment(object: any): object is Appointment {
    return (
        object &&
        typeof object.start === "string" &&
        typeof object.end === "string" &&
        typeof object.patient === "number" &&
        typeof object.type === "number" &&
        typeof object.description === "string"
    );
}

export const dbMappings = {
    offices: {
        url: "/offices/",
        typeCheck: isOffice,
    },
    patients: {
        url: "/patients/",
        typeCheck: isPatient,
    },
    appointments: {
        url: "/appointments/",
        typeCheck: isAppointment,
    },
    appointment_types: {
      url: "/appointments_types/",
      typeCheck: isAppointmentType,
    },
};

export const dbElements = Object.keys(dbMappings);

export const dbTranslationFromUrl: { [url: string]: string } = Object.fromEntries(
    Object.entries(dbMappings).map(([key, { url }]) => [url, key])
);

export const urlFromType = (value: any): string => {
    for (const [key, { url, typeCheck }] of Object.entries(dbMappings)) {
        if (typeCheck(value)) {
            return url;
        }
    }
    return "";
};

export const formatData = (value: any): any => {
    if (isPatient(value)) {
        return {
            ...value,
            podiatrist: getUserPk(),
        };
    }
    return value;
};