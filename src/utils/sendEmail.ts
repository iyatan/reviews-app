const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.NEXT_SEND_GRID_API_KEY);

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
