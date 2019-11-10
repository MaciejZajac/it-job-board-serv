const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
    logoUrl: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    creationDate: {
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
    technologies: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("jobOffer", userSchema);
