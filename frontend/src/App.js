import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Apps from './pages/Apps';
import Createuser from './pages/Create_user';
import Createapp from './pages/Create_app';
import Doctors_dash from './pages/Doctors_dash';
import Doctors_scheduled from './pages/Doctors_scheduled';
import AppointmentDetail from './pages/AppointmentDetail';
import Doctors_cancelled from './pages/Doctors_cancelled';
import Doctors_completed from './pages/Doctors_completed';
import MedicalReport from './pages/MedicalReport';

// src/index.js or src/App.js


function App() {
  // Retrieve the authentication token from local storage
  const authToken = localStorage.getItem('authToken');

  console.log("we got it ", authToken);

  const ProtectedRoutes = () => {
    if (authToken) {
      return (
        <Routes>
      
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/create-user" element={<Createuser />} />
          <Route path="/create-app" element={<Createapp />} />
          <Route path="/doctors-dash" element={<Doctors_dash />} />
          <Route path="/doctors-scheduled" element={<Doctors_scheduled />} />
          <Route path="/doctors-cancelled" element={<Doctors_cancelled />} />
          <Route path="/appointment/:id" element={<AppointmentDetail />} />
          <Route path="/doctors-completed" element={<Doctors_completed />} />
          <Route path="/medical-report" element={<MedicalReport />} />
          {/* Add more protected routes as needed */}
        </Routes>
      );
    } else {
     
      return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
