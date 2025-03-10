import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../componets/Success'; // Adjust import path as needed
import { ShowErrorToast } from '../componets/Error';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';
import CustomNavbar from '../componets/menu'


const Createapp = () => {
    const [formData, setFormData] = useState({
      doctor_id: '',
      patient_id: '',
      appointment_date: '',
      appointment_time: '',
      reason: '',
      status: '',
      priority: '',
      
    });
  
  
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
     
    
    // console.log("this is our doc ", doctors)
    // useEffect(() => {
    //   // Fetch doctors and patients data
    //   const fetchData = async () => {
    //     try {
    //       const authToken = localStorage.getItem('authToken');

    //       console.log("token found", authToken)
    //       const [doctorsResponse, patientsResponse] = await Promise.all([
    //         fetch('http://localhost:8000/api/v2/doctors', {
    //           headers: {
    //             'Authorization': `Token ${authToken}`
    //           }
    //         }).then(response => response.json()),
    //         fetch('http://localhost:8000/api/v2/patients', {
    //           headers: {
    //             'Authorization': `Token ${authToken}`
    //           }
    //         }).then(response => response.json())
    //       ]);
  
    //       setDoctors(doctorsResponse.data.doc);
    //       setPatients(patientsResponse.data.pat);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     //   showErrorToast();
    //     }
    //   };
  
    //   fetchData();
    // }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const authToken = localStorage.getItem('authToken');
          const response = await fetch('http://localhost:10000/api/v2/appointment/create', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            showSuccessToast();
            
          } else {
            console.error('Error:', response.statusText);
            ShowErrorToast();
          }
        } catch (error) {
          console.error('Error:', error);
          ShowErrorToast();
        }
      };
    
  

    return (
        <>
        <CustomNavbar />
        <div className="container">

            <main className="main-content">
                <div className="bottom-container">
                    <div className="bottom-container__left formbox">
                        <div className="box spending-box">
                            <div className="header-container">
                                <h3 className="section-header">Add a app</h3>
                                <div className="year-selector">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                                        <path d="M13.4999 15.96L10.2399 12.7C9.85492 12.315 9.85492 11.685 10.2399 11.3L13.4999 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>2025</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                                        <path d="M10.4551 15.96L13.7151 12.7C14.1001 12.315 14.1001 11.685 13.7151 11.3L10.4551 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                    
                                </div>
                            </div>
                            <div className="">
                                <form className="container" onSubmit={handleSubmit}>
                                    <div className="form">
                                    <div className="field">
                                        <label htmlFor="doctor">Doctor</label>
                                        <select className="input" name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
                                        <option value="">Select doctor</option>
                                        <option value="">Select doctor</option>
                                        <option value="isayamulaudzi@gmail.com">DR Mulaudzi</option>
                                        <option value="drsmith@email.com">DR Smith</option>
                                        <option value="drjones@email.com">DR Jones</option>
                                        <option value="drjohnson@email.com">DR Johnson</option>

                                        </select>
                                    </div>

                                    <div className="field">
                                        <label htmlFor="patient">Patient Email </label>
                                        {/* <select className="input" name="patient" value={formData.patient} onChange={handleChange} required>
                                        <option value="">Select patient</option>
                                        {patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>{patient.username}</option>
                                        ))}
                                        </select> */}
                                        <input  className="input"type="email" name="patient_id" value={formData.patient_id} onChange={handleChange} required />

                                    </div>

                                    <div className="field">
                                        <label htmlFor="appointmentDate">Appointment Date</label>
                                        <input  className="input"type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="appointmentTime">Appointment Time</label>
                                        <input  className="input" type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="status">Priority</label>
                                        <select className="input" name="priority" value={formData.priority} onChange={handleChange} required>
                                            <option value="">Select priority</option>
                                            <option value="Emergency">Emergency</option>
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </div>

                                    <div className="field">
                                        <label htmlFor="status">Status</label>
                                        <select className="input" name="status" value={formData.status} onChange={handleChange} required>
                                            <option value="">Select status</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div className="field bio">
                                        <label htmlFor="address">Visit reason</label>
                                        <textarea className="input" name="reason" value={formData.reason} onChange={handleChange}></textarea>
                                    </div>




                                    <button className="btn btn-purple" style={{ marginTop: '40px' }} type="submit">
                                        <span>Save</span>
                                    </button>
                                    </div>
                                </form>

                            </div>
                        </div>                 
                    </div>
                </div>
            </main>
        </div>

        </>

    );
    
    
}

export default Createapp;
