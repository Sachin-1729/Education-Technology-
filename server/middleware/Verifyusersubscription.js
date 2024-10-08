
const express = require('express');
const router = express.Router();

const User = require("../model/Usermodel");
const Subscription = require("../model/Subscriptionmodel")

async function verifyusersubscription(req, res, next) {
   
     const user_token = req.body.userToken;
     const stripesubscriptionid = req.body.subscription_id_stripe;
     const user = await User.findOne({token: user_token});
     if(!user)
     {
         return res.status(404).json({message: "User not found"});
     }
    
    const subscription = await Subscription.findOne({userId: user._id, stripeSubscriptionId: stripesubscriptionid});
  console.log(subscription)
    if(!subscription)
    {
        return res.status(401).json({message: "User is not subscribed to this plan"});
    }
    else if(subscription.status === 'free-user')
    {
        return res.status(401).json({message: "User is not subscribed to this plan"});
    }
    else if(subscription.status === 'active')
    {
        next();
    }
    

     

}

module.exports = verifyusersubscription;
