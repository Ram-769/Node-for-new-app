const nodemailer = require('nodemailer');
const EMAIL_USER = 'rellaramu769@gmail.com';

// Function to generate a random OTP
function generateOTP(length) {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587, // SMTP server port
    secure: false, 
    auth: {
        user: EMAIL_USER,
        pass: 'angj fvru syar qbyq'
    }
});

// Function to send OTP email
async function sendOtpEmail(email) {
    const otp = generateOTP(4);

    // HTML template for the OTP email
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 20px;
            }
            .otp {
                font-size: 32px;
                font-weight: bold;
                color: #4CAF50;
                text-align: center;
                margin: 20px 0;
            }
            .message {
                font-size: 18px;
                color: #333333;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Your OTP Code</div>
            <div class="otp">${otp}</div>
            <div class="message">Please use this OTP to complete your action. This OTP is valid for 10 minutes.</div>
            <div class="footer">Thank you for using our service!</div>
        </div>
    </body>
    </html>
    `;

    // Setup email data
    const mailOptions = {
        from: `"Welcome to my-app" <${EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`, // Plain text body for fallback
        html: htmlTemplate // HTML body
    };

    // Send mail with defined transport object
    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log('OTP sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return otp;
    } catch (error) {
        // console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email');
    }
}

module.exports = {
    sendOtpEmail
};
