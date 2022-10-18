require(`dotenv`).config()


const  MAIL_ALERT_CONFIG = {
    minValue : process.env.min,
    maxValue : process.env.max,
    emailID: process.env.email
}

const EMAILCONFIG ={
    sender_email: process.env.sender_email,
    receiver_email: process.env.receiver_email,
    user: process.env.username,
    pass: process.env.password
    }


  module.exports = {MAIL_ALERT_CONFIG, EMAILCONFIG }