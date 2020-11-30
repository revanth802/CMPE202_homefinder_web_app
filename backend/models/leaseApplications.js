const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var leaseApplications = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    homeId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    empName: { type: String, required: true }, //To be unique for seller
    creditScore: { type: String, required: true },
    netIncome: { type: String },
    status: { type: String },
    listingId: { type: String },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("leaseApplications", leaseApplications);
