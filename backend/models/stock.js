const mongoose = require('mongoose');

const schema = mongoose.Schema;

var stockSchema = new schema ({
    name : String,
    dosage : String,
    manufactureDate : String,
    expiryDate : String,
    batchId : String,
    price:String,
    manufacturer : String,
    distributer : String,
    retailer : String,
    consumer : String

});

module.exports = mongoose.model('stock', stockSchema);