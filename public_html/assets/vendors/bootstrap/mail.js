const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
var email = document.getElementById("email").value;
// middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for submitting contact form
app.post('/submit-contact-form', (req, res) => {
  const { name, email, message } = req.body;

  // create a new nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aslamaliyy775@gmail.com', // replace with your Gmail email
      pass: 'Malumfashi1' // replace with your Gmail password
    }
  });

  // send email with form data
  transporter.sendMail({
    from: 'aslamaliyy775@gmail.com', // replace with your Gmail email
    to: 'aslamaliyy775@gmail.com', // replace with your desired email recipient
    subject: 'New Contact Form Submission',
    html: `
      <h3>New Contact Form Submission</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Message: ${message}</li>
      </ul>
    `
  }, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Something went wrong.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully!');
    }
  });
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
