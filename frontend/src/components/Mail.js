import emailjs from '@emailjs/browser';
import axios from '../api';

const getRandomInt = (min, max) => {
   return min + Math.floor(Math.random() * max);
}

const sendemail = async (ID,location,Email_Time,link) => {
   const checkPassword = getRandomInt(1000, 8999);
   const templateParams = {
      to_email: ID,
      time : Email_Time,
      id: ID,
      location: location,
      checkPassword: checkPassword,
      from_name: 'Check this out!',
      link: link
   };
   emailjs.send('service_tl8q7kp', 'template_1817ej1', templateParams,"PY6tsxJdjD_9qoWfO")
   .then(async function(response) {
   const { data: { message } } 
   = await axios.post('/sendMail',
   {params: {
      ID: ID,
      info: location + ' ' + Email_Time,
      sent: 'True',
      checkPassword: checkPassword
   }});
   },async function(error) {
   const { data: { message } } 
   = await axios.post('/sendMail',
   {params: {
      ID: ID,
      info: location + ' ' + Email_Time,
      sent: 'False',
      checkPassword: checkPassword
   }});
   });
}
export default sendemail;