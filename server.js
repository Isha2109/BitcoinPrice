
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
var moment = require('moment'); 
const { createDBConn } = require('./config/db')
require(`dotenv`).config()
const router = express.Router();
const { getBtcPrice} = require('./controller/controller')
const { getUsdPrice } = require('./jobs/job')
const cron = require("node-cron");



app.use(bodyParser.json({}))
app.use(cors())
createDBConn();

app.get('/', function(req, res) {
    res.status(200).send({status:"ok", message:"incorrect path"})
})

app.get('/getUsd', async function(req, res){
    ok = await getUsdPrice()
    if(ok) res.status(200).send({status:"ok", message:"successful"})
    else res.status(500).send({status:"ok", message:"failure"}) 
})

app.get('/api/prices/btc', async function(req, res){
    btcObj={
    url : `http://localhost:3000${req._parsedUrl.pathname}?`,
    search: req._parsedUrl.query,
    createdAt : moment(req.query.date, 'DD-MM-YYYY').toDate(),
    offset : req.query.offset, 
    limit : req.query.limit }
    ok = await getBtcPrice(btcObj)
    if(ok) res.status(200).send({status:"ok", message:"successful", data : data})
    else res.status(500).send({status:"ok", message:"failure"}) 

})

cron.schedule("*/30 * * * * *", async function() {
    console.log("job scheduled")
    await getUsdPrice();
    console.log("job executed")
    
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`connection open on ${process.env.PORT || 3000}`)
})


module.exports = router;
