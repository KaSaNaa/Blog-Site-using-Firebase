/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Import function triggers from their respective submodules:
 *
 * const { onCall } = require("firebase-functions/v2/https");
 * const { onDocumentWritten } = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const firebaseFunctions = require("firebase-functions");
const nodemailer = require("nodemailer");
const process = require("process");
const cors = require("cors")({ origin: true });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Function to get user display name
const getUserDisplayName = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { uid } = req.body;
    try {
      const userRecord = await admin.auth().getUser(uid);
      res.status(200).json({ displayName: userRecord.displayName });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Unable to fetch user data" });
    }
  });
});

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
/**
/**
 * HTTP Cloud Function to send a welcome email to a new subscriber.
 * 
 * This function is triggered by an HTTP request and uses CORS to handle cross-origin requests.
 * It expects the request body to contain an `email` field, which is the recipient's email address.
 * 
 * The function constructs an email with a welcome message and sends it using a configured email transporter.
 * 
 * @function sendWelcomeEmail
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The body of the HTTP request.
 * @param {string} req.body.email - The email address of the recipient.
 * @param {Object} res - The HTTP response object.
 * 
 * @returns {void} Sends an HTTP response with a status code and message indicating the result of the email sending operation.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "email": "newuser@example.com"
 * // }
 * 
 * // Example response on success:
 * // Status: 200
 * // Body: "Welcome email sent!"
 * 
 * // Example response on error:
 * // Status: 500
 * // Body: "Error sending email"
 * 
 * @see {@link https://firebase.google.com/docs/functions/http-events} for more information on HTTP Cloud Functions.
 */
const sendWelcomeEmail = firebaseFunctions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const email = req.body.email;

    const mailOptions = {
      from: "Blog Site using Firebase",
      to: email,
      subject: "Welcome to Blog Site using Firebase",
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

// Export all functions
module.exports = {
  getUserDisplayName,
  sendWelcomeEmail,
};
