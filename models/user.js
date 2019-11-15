const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  jobOffers: [
    {
      type: Schema.Types.ObjectId,
      required: "jobOffer"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
