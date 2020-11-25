const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var favouriteHomes = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    email:{type:String,required:true},
    houseId : {type:String,required:true}
},
{
    versionKey: false
});
module.exports = mongoose.model('favouriteHomes', favouriteHomes);