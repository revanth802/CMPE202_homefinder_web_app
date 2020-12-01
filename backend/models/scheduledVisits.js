const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var scheduledVisits = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    homeId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dayOfVisit: { type: String }, //To be unique for seller
    timeOfVisit: { type: String},
    type: { type: String },
    listingId: { type: String },
},
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("scheduledVisits", scheduledVisits);

