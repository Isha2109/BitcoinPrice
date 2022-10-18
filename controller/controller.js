const { priceSchema } = require('../models/model');

async function getBtcPrice(btcObj){
    try{
        data = await priceSchema.find({ date: btcObj.date },{ _id : 0, _v: 0 },
            {
                offset:btcObj.offset,
                limit: btcObj.limit
            })
           // console.log(data)
        data = data.map(val=> {
            return {  
                timestamp: val.createdAt,
                coin: 'BTC',
                price: val.usdPrice
            }
        })
        //console.log(data )
        const datStr = btcObj.search.split('&')
        const response = {
            url : `${btcObj.url}${btcObj.search}`,
            next : `${btcObj.url}${datStr[0]}&offset=${parseInt(btcObj.offset)+parseInt(btcObj.limit)}&${datStr[2]}`,
            count: data.length,
            data
        }
        return response
    }
    catch(ex){
        console.log({ ex })
        return {}
    }
}

module.exports = { getBtcPrice }
