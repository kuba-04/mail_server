// index.js
const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;

    const msg = {
        to,
        from: process.env.SENDER_EMAIL,
        subject,
        text,
        html,
    };

    try {
        await sgMail.send(msg);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
