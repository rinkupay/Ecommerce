const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        service:"gmail",
        port: 465,
        secure: true,  // True for 465, false for other ports
        logger:true,
        debug:true,
        secureConnection:false,
        auth:{
            user: "rinkumurmupay@gmail.com",
            pass: "mvdqxlglapfsueqg",
        },
        tls:{
            rejectUnauthorized:true,
        }
    });

    const mailOptions = {
        from:"rinkumurmupay@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail