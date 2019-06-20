const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userSchema = new schema ({
    role : String,
    name : String,
    organisation : String,
    phone : String,
    email : String,
    password :String,
    address : Array,
    pincode : Number,
    doc : String,
    gstNumber : String

});

module.exports = mongoose.model('users', userSchema);