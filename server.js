
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

app.get('/api/prices/btc', async function(req, res){
    btcObj={
    url : `http://localhost:3000${req._parsedUrl.pathname}?`,
    search: req._parsedUrl.query,
    date : req.query.date,
    offset : req.query.offset, 
    limit : req.query.limit
    }
    respData = await getBtcPrice(btcObj)
    if(respData) res.status(200).send(respData)
    else res.status(500).send(respData) 

})

cron.schedule("*/30 * * * * *", async function() {
    console.log("job scheduled")
    await getUsdPrice();
    console.log("job executed")
    
});

app.listen(3000, ()=>{
    console.log(`connection open on 3000`)
})


module.exports = router;
