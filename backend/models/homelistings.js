const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var homelistingsSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    type:{type:String,required:true},
    zipcode:{type:String,required:true},
    address : {type: String, required: true},
    price : {type: String, required: true}, //To be unique for seller
    area : {type:String, required : true},
    bedrooms : {type:String},
    bathrooms : {type : String},
    flooring : {type : String},
    hometype : {type : String},
    parking : {type:String},
    amenities : {type:Array},
    year_built : {type:String}
},
{
    versionKey: false
});
module.exports = mongoose.model('home_listings', homelistingsSchema);