import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Doctors from './pages/Doctors.jsx';
import Patients from './pages/Patients.jsx';
import Apps from './pages/Apps.jsx';
import Createuser from './pages/Create_user.jsx';
import Createapp from './pages/Create_app.jsx';
import Doctors_dash from './pages/Doctors_dash';
import Doctors_scheduled from './pages/Doctors_scheduled.jsx';
import AppointmentDetail from './pages/AppointmentDetail.jsx';
import Doctors_cancelled from './pages/Doctors_cancelled.jsx';
import Doctors_completed from './pages/Doctors_completed.jsx';
import MedicalReport from './pages/MedicalReport.jsx';
import Admin_completed from './pages/allcompleted.jsx'
import Admin_scheduled from './pages/allscheduled.jsx'
import Admin_cancelled from './pages/allcancelled.jsx'
import Admin_all from './pages/allapps.jsx'
import Admin_emergency from './pages/emergency.jsx'
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
          <Route path="/admin-completed" element={<Admin_completed />} />
          <Route path="/admin-scheduled" element={<Admin_scheduled />} />
          <Route path="/admin-cancelled" element={<Admin_cancelled />} />
          <Route path="/admin-allapps" element={<Admin_all />} />
          <Route path="/emergency" element={<Admin_emergency />} />
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
