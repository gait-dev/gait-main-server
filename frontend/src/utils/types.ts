export interface Office {
    id: number;
    name: string;
    address: string;
}

export interface Patient {
    id: number;
    name: string;
    email: string;
    address: string;
}

export interface Appointment {
    id: number;
    date: string;
    patientId: number;
    description: string;
}
