const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
  // logoUrl: {
  //     type: String,
  //     required: true
  // },
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyCity: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
  // creationDate: {
  //     type: String,
  //     required: true
  // },
  // minPayment: {
  //     type: String,
  //     required: true
  // },
  // maxPayment: {
  //     type: String,
  //     required: true
  // },
  // technologies: {
  //     type: String,
  //     required: true
  // }
});

module.exports = mongoose.model("JobOffer", jobOfferSchema);
