import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Sidebar from '../componets/menu'
import '../css/menu.css'
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import { faBars,faHome ,faUserPlus,faSpinner,faCheckCircle,faEye, faSearch, faTh, faUser, faComments, faChartPie, faFolder, faShoppingCart, faHeart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';
ChartJS.register(CategoryScale,LinearScale,BarElement);






function Doctors_dash() {
    // const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState({
        scheduled: 0,
        cancelled: 0,
        completed: 0,
      });

    //   const xValues = ["Cancelled", "Completed", "Scheduled"];
    //   const yValues = [data.cancelled, data.completed, data.scheduled];
    //   const barColors = ["red", "green", "blue"];

    useEffect(() => {
        // Retrieve the authentication token from local storage
        const authToken = localStorage.getItem('authToken');
        const email = localStorage.getItem('email');
        const id = localStorage.getItem('id');

        console.log("this is doc id" , id)

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
            url: 'http://localhost:8000/api/v2/doctor/apps/dashboard_stats',
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ id}),
            success: function(response) {
                setData(response.data);
                console.log("this is my repsonse", response)
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            }
        });
    }, [navigate]);

    return (

        <div className="container">
            <nav className="sidebar">            
                <div>
                    <div className="sidebar__logo">
                    <img src={logo} alt="My Image" style={{ marginLeft:'33px',marginTop:'-60px',width: '100%', maxWidth: '400px' }} />
                         
                    </div>
                    <ul className="side-nav">
                        <span className="side-nav__header">Main Menu</span>
                        
                        <li className="side-nav__item side-nav__item-active">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.23201 3.4202L9.23239 3.41989C10.2108 2.63408 11.7843 2.63834 12.7781 3.42994C12.7783 3.43005 12.7784 3.43015 12.7785 3.43025L18.7784 8.2301C18.7789 8.23054 18.7795 8.23099 18.78 8.23143C19.1189 8.50835 19.4146 8.94381 19.6058 9.44415C19.7968 9.94409 19.8672 10.4662 19.8014 10.8985L18.6475 17.8037C18.6474 17.8042 18.6473 17.8047 18.6472 17.8052C18.4217 19.0989 17.1608 20.1667 15.8585 20.1667H6.1418C4.81982 20.1667 3.58766 19.1252 3.36227 17.8148C3.36221 17.8145 3.36215 17.8142 3.36209 17.8138L2.20746 10.9043L2.20726 10.9032C2.13345 10.4677 2.19947 9.94466 2.39002 9.44498C2.58055 8.94535 2.87982 8.51038 3.22697 8.2334L3.22784 8.2327L9.23201 3.4202ZM11.0001 18.1876C11.6521 18.1876 12.1876 17.652 12.1876 17.0001V14.2501C12.1876 13.5981 11.6521 13.0626 11.0001 13.0626C10.3482 13.0626 9.81263 13.5981 9.81263 14.2501V17.0001C9.81263 17.652 10.3482 18.1876 11.0001 18.1876Z" fill="currentColor" stroke="currentColor"/>
                            </svg>                       
                            <span>Doctors_dash</span>
                        </li>
                        <Link to="/doctors-cancelled">
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.30664 17.1375V15.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M11 17.1375V13.3425" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M15.6934 17.1375V11.4358" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M15.6933 5.86255L15.2716 6.35755C12.9341 9.08922 9.79914 11.0234 6.30664 11.8942" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M13.0073 5.86255H15.6932V8.53922" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.25016 20.6667H13.7502C18.3335 20.6667 20.1668 18.8334 20.1668 14.25V8.75004C20.1668 4.16671 18.3335 2.33337 13.7502 2.33337H8.25016C3.66683 2.33337 1.8335 4.16671 1.8335 8.75004V14.25C1.8335 18.8334 3.66683 20.6667 8.25016 20.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                       
                            <span>My Cancelled</span>
                        </li>
                        </Link>
                        <Link to="/doctors-scheduled">
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1668 9.66671V14.25C20.1668 18.8334 18.3335 20.6667 13.7502 20.6667H8.25016C3.66683 20.6667 1.8335 18.8334 1.8335 14.25V8.75004C1.8335 4.16671 3.66683 2.33337 8.25016 2.33337H12.8335" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20.1668 9.66671H16.5002C13.7502 9.66671 12.8335 8.75004 12.8335 6.00004V2.33337L20.1668 9.66671Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.4165 12.4166H11.9165" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.4165 16.0834H10.0832" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>My Scheduled</span>
                        </li>
                        </Link>

                        <Link to="/doctors-scheduled">
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.90576 7.32001L10.9999 12.0042L19.0391 7.34748" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 20.3092V11.995" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.10256 2.77331L4.20757 5.49584C3.0984 6.11001 2.19092 7.64999 2.19092 8.91499V14.0942C2.19092 15.3592 3.0984 16.8992 4.20757 17.5133L9.10256 20.2359C10.1476 20.8134 11.8617 20.8134 12.9067 20.2359L17.8017 17.5133C18.9109 16.8992 19.8184 15.3592 19.8184 14.0942V8.91499C19.8184 7.64999 18.9109 6.11001 17.8017 5.49584L12.9067 2.77331C11.8526 2.18665 10.1476 2.18665 9.10256 2.77331Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5834 12.6366V9.28167L6.88428 4.2583" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Appointments</span>
                        </li>
                        </Link>
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.2915 12.6367V11.0509C2.2915 9.15336 3.84067 7.60419 5.73817 7.60419H16.2615C18.159 7.60419 19.7082 9.15336 19.7082 11.0509V12.3709H17.8565C17.3432 12.3709 16.8757 12.5725 16.5365 12.9208C16.1515 13.2967 15.9315 13.8375 15.9865 14.415C16.069 15.405 16.9765 16.1292 17.9665 16.1292H19.7082V17.22C19.7082 19.1175 18.159 20.6667 16.2615 20.6667H11.2382" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.2915 11.8758V7.6867C2.2915 6.59587 2.96067 5.62416 3.97817 5.23916L11.2565 2.48916C12.3932 2.05833 13.6123 2.90169 13.6123 4.12085V7.60418" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20.6787 13.306V15.1944C20.6787 15.6985 20.2754 16.111 19.7621 16.1293H17.9654C16.9754 16.1293 16.0679 15.4052 15.9854 14.4152C15.9304 13.8377 16.1504 13.2968 16.5354 12.921C16.8746 12.5727 17.3421 12.371 17.8554 12.371H19.7621C20.2754 12.3894 20.6787 12.8018 20.6787 13.306Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.4165 11.5H12.8332" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.75 15.625H7.645C8.23166 15.625 8.70833 16.1016 8.70833 16.6883V17.8617" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.86833 14.5067L2.75 15.625L3.86833 16.7433" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.70833 20.4651H3.81334C3.22667 20.4651 2.75 19.9884 2.75 19.4017V18.2284" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.59131 21.5837L8.70964 20.4653L7.59131 19.347" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Records</span>
                        </li>
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.79183 17.9166H7.3335C3.66683 17.9166 1.8335 17 1.8335 12.4166V7.83331C1.8335 4.16665 3.66683 2.33331 7.3335 2.33331H14.6668C18.3335 2.33331 20.1668 4.16665 20.1668 7.83331V12.4166C20.1668 16.0833 18.3335 17.9166 14.6668 17.9166H14.2085C13.9243 17.9166 13.6493 18.0541 13.4752 18.2833L12.1002 20.1166C11.4952 20.9233 10.5052 20.9233 9.90016 20.1166L8.52516 18.2833C8.3785 18.0816 8.03933 17.9166 7.79183 17.9166Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.6633 10.5833H14.6715" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.9958 10.5833H11.004" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.3283 10.5833H7.33653" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Inbox</span>
                        </li>
                        {/* <Link to="/doctors-completed">
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.79183 17.9166H7.3335C3.66683 17.9166 1.8335 17 1.8335 12.4166V7.83331C1.8335 4.16665 3.66683 2.33331 7.3335 2.33331H14.6668C18.3335 2.33331 20.1668 4.16665 20.1668 7.83331V12.4166C20.1668 16.0833 18.3335 17.9166 14.6668 17.9166H14.2085C13.9243 17.9166 13.6493 18.0541 13.4752 18.2833L12.1002 20.1166C11.4952 20.9233 10.5052 20.9233 9.90016 20.1166L8.52516 18.2833C8.3785 18.0816 8.03933 17.9166 7.79183 17.9166Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.6633 10.5833H14.6715" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.9958 10.5833H11.004" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.3283 10.5833H7.33653" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>  
                            <span>My Completed </span>
                        </li>
                        </Link> */}
                    </ul>

                    <ul className="side-nav">
                        <span className="side-nav__header">Preferences</span>
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.75 8.85081V14.14C2.75 16.0833 2.75 16.0833 4.58333 17.3208L9.625 20.2358C10.3858 20.6758 11.6233 20.6758 12.375 20.2358L17.4167 17.3208C19.25 16.0833 19.25 16.0833 19.25 14.1491V8.85081C19.25 6.91664 19.25 6.91664 17.4167 5.67914L12.375 2.76414C11.6233 2.32414 10.3858 2.32414 9.625 2.76414L4.58333 5.67914C2.75 6.91664 2.75 6.91664 2.75 8.85081Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 14.25C12.5188 14.25 13.75 13.0188 13.75 11.5C13.75 9.98122 12.5188 8.75 11 8.75C9.48122 8.75 8.25 9.98122 8.25 11.5C8.25 13.0188 9.48122 14.25 11 14.25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Settings</span>
                        </li>
                        <li className="side-nav__item">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0002 20.6666C16.0418 20.6666 20.1668 16.5416 20.1668 11.5C20.1668 6.45831 16.0418 2.33331 11.0002 2.33331C5.9585 2.33331 1.8335 6.45831 1.8335 11.5C1.8335 16.5416 5.9585 20.6666 11.0002 20.6666Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 7.83331V12.4166" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.9951 15.1667H11.0034" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Help &amp; Center</span>
                        </li>
                        <li className="side-nav__item">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33309 20.1667H14.6664C18.3514 20.1667 19.0114 18.6908 19.2039 16.8942L19.8914 9.56083C20.1389 7.32417 19.4973 5.5 15.5831 5.5H6.41643C2.50226 5.5 1.86059 7.32417 2.10809 9.56083L2.79559 16.8942C2.98809 18.6908 3.64809 20.1667 7.33309 20.1667Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.3335 5.49998V4.76665C7.3335 3.14415 7.3335 1.83331 10.2668 1.83331H11.7335C14.6668 1.83331 14.6668 3.14415 14.6668 4.76665V5.49998" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.8332 11.9167V12.8333C12.8332 12.8425 12.8332 12.8425 12.8332 12.8517C12.8332 13.8508 12.824 14.6667 10.9998 14.6667C9.18484 14.6667 9.1665 13.86 9.1665 12.8608V11.9167C9.1665 11 9.1665 11 10.0832 11H11.9165C12.8332 11 12.8332 11 12.8332 11.9167Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.846 10.0833C17.7285 11.6233 15.3085 12.54 12.8335 12.8516" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.40186 10.3308C4.46436 11.7425 6.79269 12.595 9.16686 12.8608" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                            <span>Dark Mode</span>
                        </li>
                    </ul>
                </div>          
                
                <ul className="side-nav">
                    <Link to="/">
                    <li className="side-nav__item last-item">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.8999 8.05999C9.2099 4.45999 11.0599 2.98999 15.1099 2.98999H15.2399C19.7099 2.98999 21.4999 4.77999 21.4999 9.24999V15.77C21.4999 20.24 19.7099 22.03 15.2399 22.03H15.1099C11.0899 22.03 9.2399 20.58 8.9099 17.04" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.0001 12.5H3.62012" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.85 9.14999L2.5 12.5L5.85 15.85" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                       
                        <span>Log Out</span>
                    </li>
                    </Link>
                </ul>            
            </nav>

            <main className="main-content">
                <div className="top-container">
                    <div action="#" className="search">
                        <svg className="search__icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5418 19.25C15.3513 19.25 19.2502 15.3512 19.2502 10.5417C19.2502 5.73223 15.3513 1.83337 10.5418 1.83337C5.73235 1.83337 1.8335 5.73223 1.8335 10.5417C1.8335 15.3512 5.73235 19.25 10.5418 19.25Z" stroke="#596780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.1668 20.1667L18.3335 18.3334" stroke="#596780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>         
                        <input type="text" className="search__input" placeholder="Search something here"/>           
                    </div>
                    <div className="user-nav">
                        <button className="notification">
                            <svg className="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                                <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
                            </svg>                            
                        </button>
                        <div className="user-info">
                            <svg className="user-image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" fill="white" fill-opacity="0.01"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0321 19C8.67459 19 6.80643 17.2316 6.80643 14V13H17.1158L17.1434 13.9715C17.2358 17.2145 15.4003 19 12.0321 19ZM15.0875 15C14.8526 16.3955 13.9089 17 12.0321 17C10.1563 17 9.18179 16.3902 8.89677 15H15.0875ZM14 8H17V10H14V8ZM10 8H7V10H10V8Z" fill="black"/>
                            </svg>
                            <span className="user-name" id="localStorageValue">  </span>                        
                        </div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>    
                    </div>
                </div>
                <div className="bottom-container">

                    <div className="bottom-container__right newcontainer">
                        <div className="box" style={{width: '30%'}}>
                            <div className="header-container">
                                <h3 className="section-headerred">My sheduled Appointment</h3>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                    <path d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                    <path d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                                </svg>                                                           
                            </div>
                            <h1 className="price">{data.scheduled}<span className="price-currency">(Apps)</span></h1>
                            <p style={{borderBottom: "2px solid #1A202C"}}>From Jan 01, 2024 to Jan 31, 2025</p>
                            <Link to="/doctors-scheduled">
                                <div className="button-box">
                                    <button className="btn btn-purple">
                                        <FontAwesomeIcon icon={faEye} />
                                        <span>View Apps</span>    
                                    </button>
                                </div>
                            </Link>
                        </div>
                        <div className="box" style={{width: '30%'}}>
                            <div className="header-container">
                                <h3 className="section-headerred">My cancelled Appointment</h3>
                                                                                         
                            </div>
                            <h1 className="price">{data.cancelled}<span className="price-currency">(Apps)</span></h1>
                            <p style={{borderBottom: "2px solid #ba0d35"}}>From Jan 01, 2024 to Jan 31, 2025</p>
                            <Link to="/doctors-cancelled">
                                <div className="button-box">
                                    <button className="btn btn-purple">
                                        <FontAwesomeIcon icon={faEye} />
                                        <span>View Apps</span>    
                                    </button>
                                </div>
                            </Link>    
                        </div>
                        <div className="box" style={{width: '30%'}}>
                            <div className="header-container">
                                <h6 className="section-headerred">My Completed Appointment</h6>
                                                                                       
                            </div>
                            <h1 className="price">{data.completed}<span className="price-currency">(Apps)</span></h1>
                            <p style={{borderBottom: "2px solid #ba0d35"}}>From Jan 01, 2024 to Jan 31, 2025</p>
                            <Link to="/doctors-completed">
                                <div className="button-box">
                                    <button className="btn btn-purple">
                                        <FontAwesomeIcon icon={faEye} />
                                        <span>View Apps</span>    
                                    </button>
                                </div>
                            </Link>
                        </div>

                    </div>

                    
                </div>

            </main>
        </div>

    );
    
    
}

export default Doctors_dash;
