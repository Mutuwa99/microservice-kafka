import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import CustomNavbar from '../componets/menu'
import '../css/menu.css'
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';
ChartJS.register(CategoryScale,LinearScale,BarElement);


function Dashboard() {
    // const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState({
        doc: [],
        pat: [],
        all_apps: [],
        appnumber: 0,
        patnumber: 0,
        docnumber: 0,
        scheduled: 0,
        canceled: 0,
        completed: 0,
        high_priority_count: 0
      });


      console.log(data.high_priority_count , "eme")
      const xValues = ["Cancelled", "Completed", "Scheduled"];
      const yValues = [data.canceled, data.completed, data.scheduled];
      const barColors = ["#333", "#333", "#333"];

    useEffect(() => {
        // Retrieve the authentication token from local storage
        const authToken = localStorage.getItem('authToken');
        const email = localStorage.getItem('email');

        console.log(email ,"from local")

        const spanElement = document.getElementById('localStorageValue');

            // Check if the value exists in localStorage
            if (email !== null) {
                // Set the value of the span element
                spanElement.innerText = email;
            } else {
                // Handle the case where the value doesn't exist in localStorage
                spanElement.innerText = 'Value not found in localStorage';
            }

        if (!authToken) {
            // Redirect to the login page if token is not found
            navigate('/');
            return;
        }

        // Make an authenticated request to the backend using jQuery's $.ajax
        $.ajax({
            url: 'http://localhost:10000/api/v2/appointment/fetch_app_data',
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            },
            success: function(response) {
                setData(response);
                console.log("this is my repsonse", response)
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            }
        });
    }, [navigate]);

    return (
    <>  
    <CustomNavbar />
   
        <div className="container">

            <main className="main-content">
                <div className="bottom-container">
                    <div className="bottom-container__left">
                        <div className="box spending-box">
                            <div className="header-container">
                                <h3 className="section-header">Apps Statistics</h3>
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
                                {/* <canvas id="myChart" height="220px" width="660px"></canvas> */}
                                <Bar
                                    data={{
                                    labels: xValues,
                                    datasets: [{
                                        backgroundColor: barColors,
                                        data: yValues
                                    }]
                                    }}
                                    options={{
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "Summary Statistics"
                                    }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="box total-box">
                            <div className="total-box__left">
                                <div className="header-container">
                                    <h3 className="section-header">Total Doctors</h3>
                                    <svg className="up-arrow" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="42" height="42" rx="8" fill="#F6F7F9"/>
                                        <path d="M27.0702 18.57L21.0002 12.5L14.9302 18.57" stroke="#7FB519" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M21 29.5V12.67" stroke="#7FB519" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                
                                </div>
                                <h1 className="price"> {data.docnumber} <span className="price-currency"></span></h1>
                                <p><span className="percentage-increase">{data.docnumber}</span> doctors  in the system</p>                         
                            </div>
                            <div className="total-box__right">
                                <div className="header-container">
                                    <h3 className="section-header">Total Patient</h3>
                                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="42" height="42" rx="8" fill="#F6F7F9"/>
                                        <path d="M27.0702 23.43L21.0002 29.5L14.9302 23.43" stroke="#FF4423" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M21 12.5V29.33" stroke="#FF4423" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                                                    
                                </div>
                                <h1 className="price">{data.patnumber}<span className="price-currency"></span></h1>                            
                                <p><span className="percentage-increase">{data.patnumber}</span> patients in the system</p>
                            </div>
                        </div>
                        <div className="box transaction-box">
                            <div className="header-container">
                                <h3 className="section-header">Latest History</h3>
                                <div className="date-selector">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 1.5V3.75" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 1.5V3.75" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.625 6.8175H15.375" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.7713 10.275H11.778" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.7713 12.525H11.778" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8.99686 10.275H9.00359" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8.99686 12.525H9.00359" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.22049 10.275H6.22723" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.22049 12.525H6.22723" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    {/* <span>1 Jan - 1 Feb 2022</span>        */}
                                </div>                                
                            </div>
                            <table className="transaction-history">
                                <tr>
                                    <th>Patient</th>
                                    <th>Record
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.96004 4.47498L6.70004 7.73498C6.31504 8.11998 5.68504 8.11998 5.30004 7.73498L2.04004 4.47498" stroke="#90A3BF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>                                        
                                    </th>
                                    <th>Priority
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.96004 4.47498L6.70004 7.73498C6.31504 8.11998 5.68504 8.11998 5.30004 7.73498L2.04004 4.47498" stroke="#90A3BF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>                                        
                                    </th>
                                    <th>Date
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.96004 4.47498L6.70004 7.73498C6.31504 8.11998 5.68504 8.11998 5.30004 7.73498L2.04004 4.47498" stroke="#90A3BF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>                                       
                                    </th>
                                    <th>Status</th>
                                </tr>
                                    {data.all_apps.map((all_apps) => (
                                        <tr>
                                            <td>
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="18" cy="18" r="18" fill="#33B938" fill-opacity="0.1"/>
                                                    <path d="M24.875 21.8125V23.875H11.125V21.8125C11.125 21.4344 11.4344 21.125 11.8125 21.125H24.1875C24.5656 21.125 24.875 21.4344 24.875 21.8125Z" fill="#33B938" stroke="#33B938" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M13.6875 20.625V16.8125H14.0625V20.625H13.6875Z" fill="#33B938" stroke="#33B938"/>
                                                    <path d="M16.4375 20.625V16.8125H16.8125V20.625H16.4375Z" fill="#33B938" stroke="#33B938"/>
                                                    <path d="M19.1875 20.625V16.8125H19.5625V20.625H19.1875Z" fill="#33B938" stroke="#33B938"/>
                                                    <path d="M21.9375 20.625V16.8125H22.3125V20.625H21.9375Z" fill="#33B938" stroke="#33B938"/>
                                                    <path d="M25.5625 23.8906H10.4375C10.4367 23.8906 10.436 23.8905 10.4346 23.89C10.4328 23.8892 10.4302 23.8876 10.4275 23.885C10.4249 23.8823 10.4233 23.8797 10.4225 23.8779C10.422 23.8765 10.4219 23.8758 10.4219 23.875C10.4219 23.8742 10.422 23.8735 10.4225 23.8721C10.4233 23.8703 10.4249 23.8677 10.4275 23.865C10.4302 23.8624 10.4328 23.8608 10.4346 23.86C10.436 23.8595 10.4367 23.8594 10.4375 23.8594H25.5625C25.5633 23.8594 25.564 23.8595 25.5654 23.86C25.5672 23.8608 25.5698 23.8624 25.5725 23.865C25.5751 23.8677 25.5767 23.8703 25.5775 23.8721C25.578 23.8735 25.5781 23.8742 25.5781 23.875C25.5781 23.8758 25.578 23.8765 25.5775 23.8779C25.5767 23.8797 25.5751 23.8823 25.5725 23.885C25.5698 23.8876 25.5672 23.8892 25.5654 23.89C25.564 23.8905 25.5633 23.8906 25.5625 23.8906Z" fill="#33B938" stroke="#33B938"/>
                                                    <path d="M18.058 10.691C18.0659 10.6923 18.0707 10.6934 18.0725 10.6939L24.2562 13.1674C24.2675 13.1719 24.302 13.1932 24.335 13.2419C24.368 13.2904 24.375 13.33 24.375 13.3425V15.625C24.375 15.727 24.2895 15.8125 24.1875 15.8125H11.8125C11.7105 15.8125 11.625 15.727 11.625 15.625V13.3425C11.625 13.33 11.632 13.2904 11.665 13.2419C11.698 13.1932 11.7325 13.1719 11.7438 13.1674L17.9275 10.6939C17.9293 10.6934 17.9341 10.6923 17.942 10.691C17.9573 10.6886 17.9775 10.6869 18 10.6869C18.0225 10.6869 18.0427 10.6886 18.058 10.691ZM16.4688 13.5625C16.4688 14.4093 17.1532 15.0938 18 15.0938C18.8468 15.0938 19.5312 14.4093 19.5312 13.5625C19.5312 12.7157 18.8468 12.0313 18 12.0313C17.1532 12.0313 16.4688 12.7157 16.4688 13.5625Z" fill="#33B938" stroke="#33B938"/>
                                                </svg>                                        
                                                
                                            </td>
                                            <td>{all_apps.id}</td>
                                            <td>{all_apps.priority}</td>
                                            <td>
                                                <svg className="status" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="16" height="16" rx="8" fill="#BCE455" fill-opacity="0.3"/>
                                                    <circle cx="8" cy="8" r="4" fill="#7FB519"/>
                                                </svg>  
                                                {all_apps.appointment_date}                                      
                                               
                                            </td>
                                            <td>{all_apps.status}</td>
                                        </tr>

                                    ))}
                            </table>
                        </div>                   
                    </div>
                    <div className="bottom-container__right">
                        <div className="box">
                            <div className="header-container">
                                <h3 className="section-headerred">Emergency Appointment</h3>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                    <path d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                    <path d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                </svg>                                                           
                            </div>
                            <h1 className="price">{data.high_priority_count}<span className="price-currency">(Apps)</span></h1>
                            <p style={{borderBottom: "2px solid #ba0d35"}}></p>
                            <div className="button-box" onClick={() => navigate("/emergency")}>
                                <button className="btn btn-purple" >
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>View Apps</span>    
                                </button>
                            </div>
                        </div>
                        <div className="box spending-box">
                                <div className="header-container">
                                    <h3 className="section-header"><b>Top Doctor : </b><span> <b>DR T </b></span></h3>
                                                            
                                </div>
                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                                                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                            <div>
                            
                            </div>
                            {/* <div className="overall-spending" style={{ width: '100%', height: '400px' }}>
                                <img
                                    // src="https://cdn.prod.website-files.com/6466101d017ab9d60c8d0137/65df25f0a339915ec6c00de7_Out%20of%20Hospital%20Costs_Savings%20for%20Medical%20Schemes.jpg"
                                    alt="External Logo"
                                    style={{
                                    width: '100%',   // Make image width 100% of the div
                                    height: 'auto%',  // Make image height 100% of the div
                                    objectFit: 'cover',  // Ensures image covers the div while maintaining aspect ratio
                                    marginTop: '175px',
                                    }}
                                />
                            </div> */}

                        </div>

                        <div className="box spending-box">
                                <div className="header-container">
                                    <h3 className="section-header"><b>Top Doctor : </b><span> <b>DR T </b></span></h3>
                                                            
                                </div>
                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                                                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                            <div>
                            
                            </div>
                            {/* <div className="overall-spending" style={{ width: '100%', height: '400px' }}>
                                <img
                                    // src="https://cdn.prod.website-files.com/6466101d017ab9d60c8d0137/65df25f0a339915ec6c00de7_Out%20of%20Hospital%20Costs_Savings%20for%20Medical%20Schemes.jpg"
                                    alt="External Logo"
                                    style={{
                                    width: '100%',   // Make image width 100% of the div
                                    height: 'auto%',  // Make image height 100% of the div
                                    objectFit: 'cover',  // Ensures image covers the div while maintaining aspect ratio
                                    marginTop: '175px',
                                    }}
                                />
                            </div> */}

                        </div>
                        <div className="box spending-box">
                                <div className="header-container">
                                    <h3 className="section-header"><b>Top Doctor : </b><span> <b>DR T </b></span></h3>
                                                            
                                </div>
                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                                                                <div className="pie-chart " style={{height: "90px"}}>
            
                                        <button className="btn btn-purple" >
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span>234 Apps</span>    
                                        </button>
                            
                            
                                </div>
                            <div>
                            
                            </div>
                            {/* <div className="overall-spending" style={{ width: '100%', height: '400px' }}>
                                <img
                                    // src="https://cdn.prod.website-files.com/6466101d017ab9d60c8d0137/65df25f0a339915ec6c00de7_Out%20of%20Hospital%20Costs_Savings%20for%20Medical%20Schemes.jpg"
                                    alt="External Logo"
                                    style={{
                                    width: '100%',   // Make image width 100% of the div
                                    height: 'auto%',  // Make image height 100% of the div
                                    objectFit: 'cover',  // Ensures image covers the div while maintaining aspect ratio
                                    marginTop: '175px',
                                    }}
                                />
                            </div> */}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    </>
    );
    
    
}

export default Dashboard;
