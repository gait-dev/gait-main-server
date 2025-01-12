import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientList, PatientDetail, PatientForm } from './models/Patient';
import { AppointmentList, AppointmentForm } from './models/Appointment';
import LoginView from './components/LoginView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publique pour la connexion */}
        <Route path="/" element={<LoginView />} />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppointmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments/new"
          element={
            <PrivateRoute>
              <AppointmentForm />
            </PrivateRoute>
          }
        />

        {/*Routes pour les patients */}
        <Route path="/patients" element={
          <PrivateRoute>
            <PatientList />
          </PrivateRoute>
        } />
        <Route path="/patients/:id" element={
          <PrivateRoute>
            <PatientDetail patientId={1} />
          </PrivateRoute>
        } />
        <Route path="/patients/new" element={
          <PrivateRoute>
            <PatientForm />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}



export default App;
