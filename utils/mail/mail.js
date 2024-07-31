const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: `${process.env.MAIL_SERVICE}`,
    port: 587,
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWORD}`
    }
});

const sendInvitationEmail = async (email, teamName) => {
    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Invitation to join ${teamName}`,
        html: `
            <h1>You've been invited to join ${teamName}!</h1>
            <p>Hello,</p>
            <p>You have been invited to join the team "${teamName}" on our platform.</p>
            <p>To accept this invitation, please click on the link below:</p>
            <a href="${process.env.FRONTEND_URL}/accept-invitation?team=${encodeURIComponent(teamName)}">Accept Invitation</a>
            <p>If you did not expect this invitation, please ignore this email.</p>
            <p>Best regards,<br>Your Application Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Invitation email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending invitation email to ${email}:`, error);
        throw new Error('Failed to send invitation email');
    }
};

module.exports = { transporter, sendInvitationEmail };
