const nodemailer = require("nodemailer");


const sendEmail = async (req, res) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "nels61@ethereal.email",
      pass: "b95CDe238MAYsSTk5S",
    },
  });

  let info = await transporter.sendMail({
    from: '"Alim" <alim@gmail.com>', // sender address
    to: "mohdalim619@gmail.com, mohdalim8180036208@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.json(info);
};
module.exports = sendEmail;
