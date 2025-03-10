// Toast.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';  // Import the iziToast CSS

export const showSuccessToast = () => {
  iziToast.success({
    backgroundColor: 'green',        // Green background color for success
    timeout: 6000,                   // Toast duration in milliseconds (2 seconds)
    close: false,                    // Disables close button
    overlay: true,                   // Enable overlay (background dimming)
    displayMode: 'once',             // Toast appears only once
    id: 'question',                  // ID to target the toast
    zindex: 999,                     // Set the z-index to ensure it's on top
    title: 'Hey',                    // Title of the toast
    message: 'Operation successful', // Message of the toast
    position: 'center',            // Position at the top right of the screen
    transitionIn: 'fadeIn',          // Smooth fade-in transition
    transitionOut: 'fadeOut',        // Smooth fade-out transition

    // Optional styling for additional customization:
    maxWidth: 800,                  // Maximum width for the toast
    icon: 'fa fa-check-circle',     // Optional icon (use Font Awesome icon)
    iconColor: '#fff',              // Icon color (white)
    messageColor: '#fff',           // Text color (white)
    progressBarColor: '#fff',       // Progress bar color (white)
  });
};
