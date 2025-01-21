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
}

export interface Appointment {
    id: number;
    date: string;
    patientId: number;
    description: string;
}

export const dbElements = [
    'offices', 'appointments', 'patients'
]


export const dbTranslationFromUrl: {[url : string]: string;} = {
    '/offices/' : 'offices',
    '/appointments/' : 'appointments',
    '/patients/' : 'patients',
}