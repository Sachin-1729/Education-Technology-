const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({

  Productname: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    default: "pending", 
  },
  plan_id:{
    type: String,
  },
 PriceinInr: {
    type: Number, 
  },
  Billingpriod: {
    type: String, 
  },
  currentPeriodEnd: {
    type: Date, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const Membership = mongoose.model("Membership", membershipSchema);
module.exports = Membership;
