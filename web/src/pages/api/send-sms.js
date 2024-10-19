// pages/api/send-sms.js

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Twilio Account SID from environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;    // Twilio Auth Token from environment variables
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { toPhoneNumber, fromPhoneNumber } = req.body;

    try {
      // Sending the SMS using Twilio
      await client.messages.create({
        body: `You are receiving a call from ${fromPhoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
        to: toPhoneNumber, // Phone number to send the SMS to
      });

      res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Failed to send SMS', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
