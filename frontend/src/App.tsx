import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteLayout from './components/common/RouteLayout';
import { PatientList, PatientDetail, PatientForm } from './models/Patient';
import { Calendar, AppointmentForm } from './models/Appointment';
import LoginView from './components/LoginView';
import CalendarHeader from './models/Appointment/CalendarHeader';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publique pour la connexion */}
        <Route path="/" element={<LoginView />} />

        <Route
          path="/appointments"
          element={
            <RouteLayout centralComponent={<CalendarHeader/>} />
          }>
          <Route index element={<Calendar />} />

        </Route>
        <Route
          path="/appointments/new"
          element={
            <RouteLayout centralComponent={<h1 className="text-xl font-bold">Ajouter un rendez-vous</h1>} />
          }>
          <Route index element={<AppointmentForm />} />
        </Route>


        {/*Routes pour les patients */}
        <Route path="/patients" element={
          <RouteLayout centralComponent={< h1 className="text-xl font-bold">Patients</h1>} />
        }>
          <Route index element={<PatientList />} />
        </Route>

        <Route path="/patients/:id" element={
          <RouteLayout centralComponent={< h1 className="text-xl font-bold">Patient details</h1>} />
        }>
          <Route index element={<PatientDetail patientId={1} />} />
        </Route>

        <Route path="/patients/new" element={
          <RouteLayout centralComponent={< h1 className="text-xl font-bold">Patient Form</h1>} />
        }>
          <Route index element={<PatientForm />} />
        </Route>

      </Routes>
    </Router >
  );
}



export default App;
