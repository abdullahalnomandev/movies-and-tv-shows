//WITH GMAIL
import nodemailer from 'nodemailer';

const sendMailWIthEmail = async (data) => {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_USER_EMAIL,
                pass: process.env.USER_PASSWORD
            },
        });
        let info = await transporter.sendMail({
            from: process.env.SENDER_USER_EMAIL,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: `
            <p>Thank you for creating your account. Please confirm your account here:</p>
            <a href=${data.url} >
            <button style="background:green; border:none;padding:10px 20px; border-radius:20px;color:white;cursor:pointer;">
            VERIFY 
            </button>
            </a>`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return info.messageId;

    } catch (error) {
        console.log(error);
    }
}


// WITH MAILGUN 
import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailGun = new Mailgun(formData)
const mg = mailGun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '6ae6aa177de3285d4dee43ea1fe0bf53-381f2624-43093dbf',
    url: 'https://api.eu.mailgun.net'
});
const sendMailWIthMailGun = async (data) => {

    try {
        const result = await mg.messages.create('sandbox-123.mailgun.org', {
            from: "Excited User <mailgun@sandbox-123.mailgun.org>",
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: "<h1>Testing some Mailgun awesomness!</h1>"
        })
        return result.id;

    } catch (error) {

        console.log(error);
    }
}
export { sendMailWIthMailGun, sendMailWIthEmail };


// LOAD balance for millions data