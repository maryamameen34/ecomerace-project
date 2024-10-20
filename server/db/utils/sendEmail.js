const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const nodemailer = require("nodemailer")


const userMail = async(options) => {
    const transporter = nodemailer.createTransport({
        host : process.env.SMPT_HOST ,
        port : process.env.SMPT_PORT ,
        service : process.env.SMPT_SERVICES ,
        auth : {
            user : process.env.SMPT_EMAIL ,
            pass : process.env.SMPT_PASSWORD ,
        },
    });
    const emailOptions = {
        from: `"Online Shop" <${process.env.SMPT_EMAIL}>`,
        to : options.email ,
        subject : options.subject ,
        text : options.message ,
    };

    await transporter.sendMail(emailOptions)
}


module.exports = userMail
