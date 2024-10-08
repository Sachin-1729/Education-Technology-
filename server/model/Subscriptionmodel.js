const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links to the User model
    required: true,
  },
 
  stripeSubscriptionId: {
    type: String, // Stripe's subscription ID
    required: true,
  },
  status: {
    type: String, // Current status of the subscription
    required: true,
    default: 'free-user'
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership', // Links to the Membership model
    required: true,
  },
  currentPeriodEnd: {
    type: Date, // Subscription period end date
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Subscription', SubscriptionSchema);
