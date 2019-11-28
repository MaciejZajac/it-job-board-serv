const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  companyCity: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  minPayment: {
    type: String,
    required: true
  },
  maxPayment: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  companyPage: {
    type: String,
    required: true
  },
  companyAdress: {
    type: String,
    required: true
  },
  creationDate: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("JobOffer", jobOfferSchema);
