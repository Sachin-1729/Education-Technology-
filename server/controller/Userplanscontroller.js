const Subscription = require('../model/Subscriptionmodel');
const User = require('../model/Usermodel');


async function userpurchasedplan(req , res)
{

    const user = await User.findOne({ token: req.body.userToken }); // Correct
   
   
    if(!user)
    {
        return res.status(404).json({ message: 'User not found' });
    }
    const user_id = user._id;
    console.log(user_id);
    const subscription = await Subscription.find({ userId: user_id })
    .populate('userId')
    .populate('planId');
    
    
   
    return res.send(subscription);
   

}

module.exports= {userpurchasedplan}