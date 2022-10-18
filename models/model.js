
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var priceSchema = new Schema({
    usdPrice :{ type: Number },
    createdAt : { type : Date , default: Date.now },
})

var priceSchema = mongoose.model('price', priceSchema)

module.exports = {
    priceSchema
}
