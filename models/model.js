
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var priceSchema = new Schema({
    usdPrice :{ type: Number },
    createdAt : { type : Date , default: Date.now },
    date : String
})

var priceSchema = mongoose.model('price', priceSchema)

module.exports = {
    priceSchema
}
