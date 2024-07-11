 const nodemailer=require('nodemailer')
 const transporter = nodemailer.createTransport({
    service:'gmail',
    host: `${process.env.MAIL_SERVICE}`,
    port: 587,
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWORD}`
    }
});

module.exports={transporter}
