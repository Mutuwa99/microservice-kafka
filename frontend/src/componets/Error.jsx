// Toast.js
import iziToast from 'izitoast';

export const ShowErrorToast = () => {
  iziToast.error({
    backgroundColor: 'red',
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'Hey',
    message: ', there was an error ',
    position: 'center',
    

  });
};

export default ShowErrorToast; // Exporting as default, if needed
