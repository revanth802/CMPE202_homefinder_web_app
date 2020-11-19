const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var homelistingsSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    address : {type: String, required: true},
    price : {type: String, required: true}, //To be unique for seller
    type : {type: String, required: true},
    Lot: {type: String },
    parking: {type: String},
    status:{type:String},
    owner:{type:String},
    ownerid:{type:String}
},
{
    versionKey: false
});
module.exports = mongoose.model('home_listings', homelistingsSchema);