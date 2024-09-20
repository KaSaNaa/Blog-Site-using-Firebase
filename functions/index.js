/* eslint-disable no-undef */
/**
 * Import function triggers from their respective submodules:
 *
 * const { onCall } = require("firebase-functions/v2/https");
 * const { onDocumentWritten } = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// eslint-disable-next-line no-unused-vars
const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const process = require("process");
const cors = require("cors")({ origin: true });

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable "less secure apps" in your account settings.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// Cloud Function to send email
exports.sendWelcomeEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const email = req.body.email;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to Dev@Deakin",
            text: "Thank you for subscribing to our newsletter!",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send("Error sending email");
            }
            console.log("Email sent:", info.response);
            return res.status(200).send("Welcome email sent!");
        });
    });
});