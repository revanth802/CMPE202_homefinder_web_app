const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var homelistingsSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    type:{type:String,required:true},
    addressLine1 : {type: String, required: true},
    addressLine2 : {type: String},
    city: {type:String, required: true},
    state: {type:String, required: true},
    zipcode:{type:String,required:true},
    price : {type: Number, required: true}, 
    area : {type:Number, required : true},
    bedrooms : {type:Number},
    bathrooms : {type : Number},
    flooring : {type : String},
    hometype : {type : String},
    parking : {type:String},
    amenities : {type:Array},
    year_built : {type:Number},
    leaseTerms:{type:String},
    securityDeposit:{type:String},
    availableDate:{type:Date},
    representedBy:{type:String,required:true},
    isOwnerRepresented:{type:Boolean, required:true},
    otherAmenities:{type:String}
},
{
    versionKey: false
});
module.exports = mongoose.model('home_listings', homelistingsSchema);