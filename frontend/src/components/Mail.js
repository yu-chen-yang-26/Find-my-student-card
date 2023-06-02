import emailjs from "@emailjs/browser";

const sendemail = async (email, checkPassword) => {
  const templateParams = {
    to_name: "hihi",
    to_email: email,
    checkPassword: checkPassword,
    from_name: "Check this out!",
  };
  emailjs
    .send(
      "service_zd5j8ce",
      "template_ua8ixjm",
      templateParams,
      "iJ9lomQIf6oO5SchE"
    )
    .catch((err) => console.log(err));
};
export default sendemail;
