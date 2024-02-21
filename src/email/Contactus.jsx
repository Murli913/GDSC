
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
const Contactus = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_v1gm6rs', 'template_viu5l96', form.current, {
          publicKey: 'uYtd_6Wk0tLOhJPR8',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="submit" value="Send Notification To Police"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
    </form>
  )
}

export default Contactus