import axios from 'axios'
import emailjs from '@emailjs/browser';
const sendemail = async (message,ID,location,Email_Time) => {
    var templateParams = {
        to_email: ID,
        time : Email_Time,
        id: ID,
        location: location,
        from_name: 'Check this out!',
        link: 'www.'
    };
    console.log("templateParams=",templateParams);
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
    emailjs.send('service_tl8q7kp', 'template_1817ej1', templateParams,"PY6tsxJdjD_9qoWfO")
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    // return msg
   }




export default sendemail;