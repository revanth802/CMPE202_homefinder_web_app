const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var favouriteSearchesSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    user:{type:String,required:true},
    homeId:{type:String,required:true},
    // type:{type:String,required:true},
    // addressLine1 : {type: String, required: true},
    // addressLine2 : {type: String},
    // city: {type:String, required: true},
    // state: {type:String, required: true},
    // zipcode:{type:String,required:true},
    // price : {type: Number, required: true}, 
    // bedrooms : {type:Number},
    // bathrooms : {type : Number},
    // flooring : {type : String},
    // hometype : {type : String},
    // parking : {type:String},
    // amenities : {type:String},
    // year_built : {type:Number},
    // status:{type:String},
    frequency:{type:Number,default:0}
},
{
    versionKey: false
});
module.exports = mongoose.model('favourite_searches', favouriteSearchesSchema);