import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../componets/Success'; // Adjust import path as needed
import { ShowErrorToast } from '../componets/Error';
import { useLocation } from 'react-router-dom';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';
import CustomNavbar from '../componets/menu'



const AppDetail = () => {

    const location = useLocation();
    const { app } = location.state || {};

    console.log(app.patient_id , "my appid")
    const [formData, setFormData] = useState({
      status: '',
      id: app.id
    });

    const [reportData, setReportData] = useState(null);
 
  
  
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
     

    const appId = app.pat_id; // replace with the actual app_id you need to send  ......
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const authToken = localStorage.getItem('authToken');
          const response = await fetch('http://54.242.200.197:8000/api/v2/doctor/apps/history', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ app_id: app.patient_id  })
          });
          const data = await response.json();
          setReportData(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [appId]);

    console.log("our report data is ",reportData )

    const handleViewReport = () => {
        console.log("sent" , app.patient_id)
        navigate('/medical-report', { state: { patientId: app.patient_id } });
      }; 


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
          const response = await fetch('http://localhost:10000/api/v2/appointment/update', {
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
                                <h3 className="section-header blink-soft" style={{animation: 'blinker 1.5s linear infinite !important'}}>Please update Appointment status once done with the patient</h3>
                                <div className="year-selector">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                                        <path d="M13.4999 15.96L10.2399 12.7C9.85492 12.315 9.85492 11.685 10.2399 11.3L13.4999 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span></span> <button style={{width:'98%', margin:'5px',marginBottom:'10px'}} className='btn reprt' onClick={handleViewReport} >view medical history</button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                                        <path d="M10.4551 15.96L13.7151 12.7C14.1001 12.315 14.1001 11.685 13.7151 11.3L10.4551 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                    
                                </div>
                                <p>Current Status: 
                                    <span style={{ color: app.status === 'Completed' ? 'green' : 'red' }}>
                                        {app.status}
                                    </span>
                                </p>

                            </div>
                            <div className="">
                                <form className="container" onSubmit={handleSubmit}>
                                    <div className="form">
                                    <div className="field">
                                        <label htmlFor="doctor">Doctor</label>
                                        <input className="input" name="doctor" value={app.doctor_id} onChange={handleChange} required/> 
                                    </div>

                                    <div className="field">
                                        <label htmlFor="patient">Patient</label>
                                        <input className="input" name="patient" value={app.patient_id} onChange={handleChange} required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="appointmentDate">Appointment Date</label>
                                        <input  className="input"type="text" name="appointmentDate" value={app.appointment_date} onChange={handleChange} required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="appointmentTime">Appointment Time</label>
                                        <input  className="input" type="text" name="appointmentTime" value={app.appointment_date} onChange={handleChange} required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="status">Priority</label>
                                        <input className="input" name="priority" value={app.priority} onChange={handleChange} required />
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
                                        <textarea className="input" name="reason" value={app.reason} onChange={handleChange}></textarea>
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

export default AppDetail;
