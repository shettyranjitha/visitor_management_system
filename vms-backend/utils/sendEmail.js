const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"VMS System " <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("📩 Email SENT to:", to);
    console.log("📬 Email Message ID:", info.messageId);

    return info;

  } catch (err) {
    console.log("❌ Email SENDING FAILED:", err);
  }
};

module.exports = sendEmail;
