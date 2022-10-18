const { MAIL_ALERT_CONFIG, EMAILCONFIG }  = require('../constants/constants')
const nodemailer = require("nodemailer");
const axios = require('axios');
const { priceSchema } = require('../models/model');

async function getUsdPrice() {
    try{
        const config = {
            method: 'get',
            url: 'https://api.coingecko.com/api/v3/coins/bitcoin'
        }
        let res = await axios(config)
        const usdPrice = res.data.market_data.current_price.usd
        const bitCoinObj = new priceSchema({
            usdPrice, date : new Date()
        })
        data = await bitCoinObj.save();
        if (usdPrice <= MAIL_ALERT_CONFIG.minValue || usdPrice >= MAIL_ALERT_CONFIG.maxValue) await alertMail()
    } 
    catch(ex){
        console.log({ ex })
}}

async function alertMail(){ 
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: EMAILCONFIG.user,
            pass: EMAILCONFIG.pass
        },
    });
    let info = await transport.sendMail({
        from: EMAILCONFIG.sender_email,
        to: EMAILCONFIG.receiver_email,
        subject: "Bitcoin Price Update",
        html: "<p>We have noticed a change in the bitcoin price, check this out for details</p>"
    });
    console.log("Message sent: %s", info.messageId)
}

module.exports = { getUsdPrice }