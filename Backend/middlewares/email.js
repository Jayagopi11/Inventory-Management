const nodemailer = require("nodemailer");

const EMAIL_USER = "jayagopithirumoorthy11@gmail.com"; // your Gmail
const EMAIL_PASS = "crleyvhuhxuynubk"; // your Gmail App Password

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer Error:", error);
  } else {
    console.log("✅ Mail transporter is ready");
  }
});

const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = { sendMail };
