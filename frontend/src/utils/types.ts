import { getUserPk } from "./auth";



export interface Office {
    id: number;
    name: string;
    address: string;
}

function isOffice(object: any): object is Office {
    return true;
}

export interface Patient {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    podiatrist: number;
}

function isPatient(object: any): object is Patient {
    return true;
}

export interface Appointment {
    id: number;
    start: string;
    end: string;
    patient: number;
    description: string;
}

function isAppointment(object: any): object is Appointment {
    return true;
}

export const dbElements = [
    'offices', 'appointments', 'patients'
]


export const dbTranslationFromUrl: {[url : string]: string;} = {
    '/offices/' : 'offices',
    '/appointments/' : 'appointments',
    '/patients/' : 'patients',
}


export const urlFromType = (value : any) : string => {
    if(isPatient(value)) return '/patients/';
    if(isAppointment(value)) return '/appointments/';
    if(isOffice(value)) return '/offices/';

    return ""
}

export const formatData = (value:any) : any =>{
    if(isPatient(value)){
        value.podiatrist = getUserPk()
    }

    return value
}