import emailjs from "@emailjs/browser";

const sendemail = async ({
  mode,
  email,
  ID,
  checkPassword,
  category,
  foundLocation,
  retrieveLocation,
  time,
  remark,
}) => {
  const forgotTemplate = {
    to_email: email,
    checkPassword: checkPassword,
    from_name: "Check this out!",
  };
  const lostTemplate = {
    to_name: ID,
    to_email: ID + "@ntu.edu.tw",
    category: category,
    foundLocation: foundLocation,
    retrieveLocation: retrieveLocation,
    time: time,
    remark: remark,
    from_name: "Check this out!",
  };
  emailjs
    .send(
      "service_zd5j8ce",
      mode === "forgot" ? "template_ua8ixjm" : "template_xvhcqvh",
      mode === "forgot" ? forgotTemplate : lostTemplate,
      "iJ9lomQIf6oO5SchE"
    )
    .catch((err) => console.log(err));
};
export default sendemail;
