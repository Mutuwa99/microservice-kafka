import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faUserPlus, faSpinner, faCheckCircle, faEye, faSearch, faTh, faUser, faComments, faChartPie, faFolder, faShoppingCart, faHeart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';
import CustomNavbar from '../componets/menu'

function Admin_sheduled() {
    const [data, setData] = useState({
        completed_appointments: [],
        cancelled_appointments: [],
        scheduled_appointments: [],
    });

    const navigate = useNavigate();  // Defined the navigate hook

    console.log("testing data", data);

    // click handleViewClick
    const handleViewClick = (app) => {
        navigate(`/appointment/${app.id}`, { state: { app } });
        console.log("app data", app);
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        // Make an authenticated request to the backend using jQuery's $.ajax
        $.ajax({
            url: 'http://localhost:10000/api/v2/appointment/fetch_appointments',
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
            success: function (response) {
                setData(response);
                console.log("this is my response 1", response);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            }
        });
    }, [navigate]);  // Added navigate as a dependency

    console.log("this is out data", data);

    return (
        <>
            <CustomNavbar />
            <div className="container" style={{marginTop:"20px"}}>

                <main className="main-content">
                    <div className="bottom-container">

                        <div className="bottom-container__table">
                            <div className="box transaction-box">
                                <h5 className='liner'>See below appointments</h5>
                                <div className="header-container">
                                    <h5 className="section-header">Scheduled</h5>
                                </div>
                                <table className="transaction-history">
                                    <thead>
                                        <tr>
                                            <th>Doctor</th>
                                            <th>Patient</th>
                                            <th>Priority</th>
                                            <th>Date
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.96004 4.47498L6.70004 7.73498C6.31504 8.11998 5.68504 8.11998 5.30004 7.73498L2.04004 4.47498" stroke="#90A3BF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>                                       
                                            </th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.scheduled_appointments.map((app, index) => (
                                            <tr key={index}>
                                                <td>{app.doctor_id}</td>
                                                <td>{app.patient_id}</td>
                                                <td>{app.priority}</td>
                                                <td>{app.appointment_date}</td>
                                                <td>
                                                <svg className="status" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="16" height="16" rx="8" fill="red" fill-opacity="0.3"/>
                                                    <circle cx="8" cy="8" r="4" fill="#7FB519"/>
                                                </svg>    
                                                </td>
                                                <td>
                                                <FontAwesomeIcon icon={faEye}  onClick={() => handleViewClick(app)}/>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Admin_sheduled;
