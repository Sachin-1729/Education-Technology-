const stripe = require('stripe')('your stripe api key');
const Subscription = require('../model/Subscriptionmodel');
const User = require('../model/Usermodel');
const endpointSecret = 'whsec_bfc23b7e938bd7a777f329489d2583e43752c04cc277c98b23b91c7dfc5b7047';
const Memebership = require('../model/MembershipModel')
const Transaction = require('../model/TransactionModel')


async function handleTransaction(session)
{  
     const subscription = await stripe.subscriptions.retrieve(session.subscription);
     const plan = subscription.items.data[0].price;
     plan_id = plan.id.toString();
     const membership = await Memebership.findOne({plan_id:  plan.id});
      try {
        const transaction = new Transaction({
          userId: session.client_reference_id,
          subscriptionId: session.subscription,
          planId: (membership._id?  membership._id :subscription.items.data[0].price.id),
          stripeTransactionId: session.id,
          amount: session.amount_total / 100,
          status: 'success',
         
        })
        await transaction.save();

      } catch (error) {
        console.log('Error saving transaction:', error);
      }
}

async function handleFailedTransaction(invoice)
{

  try {
    const transaction = new Transaction({
      userId: invoice.customer,
      subscriptionId: invoice.subscription,
      planId: invoice.lines.data[0].price.id,
      stripeTransactionId: invoice.id,
      amount: invoice.total / 100,
      status: 'failed',
     
    })
    await transaction.save();
  } catch (error) {
    console.log('Error saving failed transaction:', error);
  }
}


async function checkout(req , res)
{ 
  // console.log(req.body);
  const plan_id = req.body.plan_id;
  const usertoken = req.body.Token;

  // console.log(plan_id , "Plan id")
  const plan = await stripe.plans.retrieve(plan_id); // replace with your actual plan_id
  const productId = plan.product;
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });
  // console.log("jnsvsnvkjsv" ,prices.data[0].id)
  const latestPrice = prices.data[0];
 
   

 
  const user = await User.findOne({token: usertoken});
  if(!user)
  {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // console.log(user);


  const YOUR_DOMAIN = 'http://localhost:3000/users/pricing'
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: latestPrice.id, // Use the plan (price) ID here
        quantity: 1,
      },
    ],
    mode: 'subscription', // Since it's a recurring plan
    success_url: `${"http://localhost:3000/pricing"}`,
    cancel_url: `${"http://localhost:3000/users"}/cancel`,
    client_reference_id: user._id.toString(), // Linking the session to the user
  });
    // Send the session ID to the client
    
    res.json({ id: session.id });
}

async function gettingtransactiondetailwithwebhook(req , res)
{
  const sig = req.headers['stripe-signature']; // Stripe signature header
  let event ;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch(event.type)
  {
  case 'checkout.session.completed':
            const session = event.data.object;
            // Payment succeeded - handle this in the database
            await handleTransaction(session);
            break;
  case 'invoice.payment_failed':   
            const failedInvoice = event.data.object;
            // Payment failed - log failed transaction in the database
            await handleFailedTransaction(failedInvoice);
            break;       
// Handle other event types here

default:
              console.log(`Unhandled event type ${event.type}`);
  }  
  res.sendStatus(200);     

}

async function checkoutwithwebhookconfirmation(req , res)
{
  const sig = req.headers['stripe-signature']; // Stripe signature header
  let event;

  console.log("Webhook triggered");
  // console.log("Request body:", req.body); // Convert to string if necessary
  // console.log("Request headers:", req.headers);
  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log("Event received:", JSON.stringify(event, null, 2));
  if(event.type === 'checkout.session.completed')
  { 
    const session = event.data.object;
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    const user = await User.findOne({_id: session.client_reference_id});
 
    await user.save();
      // Save subscription in your database
      if(subscription.status === 'active')
      { 
        const plan = subscription.items.data[0].price;
        plan_id = plan.id.toString();

        // console.log(plan.id.toString() , "plan");
        
        const membership = await Memebership.findOne({plan_id:  plan.id});
        // console.log(membership, "membership");
        
        const newSubscription = new Subscription({
        userId: session.client_reference_id, // Reference to user from session
        stripeSubscriptionId: subscription.id,
        status: subscription.status, // Status from Stripe ('trialing', 'active', etc.)
        planId: (membership._id?  membership._id :subscription.items.data[0].price.id) , // Plan ID from Stripe
        currentPeriodEnd: new Date(subscription.current_period_end * 1000), // Convert from Unix timestamp to Date
      });
      await newSubscription.save();
      // console.log('Subscription saved:', newSubscription);
    }
    else{
      console.log('Subscription status:', subscription.status);
    }
      

  }
  else if(event.type === 'customer.subscription.deleted')
  {
    const canceledSubscription = event.data.object;
    const canceledSubscriptionId = canceledSubscription.id;
    console.log('Handling subscription canceled:', canceledSubscriptionId);
      await Subscription.updateOne(
        { stripeSubscriptionId: canceledSubscriptionId },
        { status: 'canceled' }
      );
      console.log('Subscription canceled:', canceledSubscription);
  }
  // else if(event.type === 'customer.subscription.updated') {
  //   const updatedSubscription = event.data.object;
  //   const updatedSubscriptionId = updatedSubscription.id; // Subscription ID from event
  //   console.log("updated webhook me hu")
  //   try {
  //     // Check the current status of the subscription in Stripe
  //     if (updatedSubscription.status === 'active') {
  //       // Pause the subscription in Stripe
  //       const pausedSubscription = await stripe.subscriptions.update(updatedSubscriptionId, {
  //         pause_collection: { behavior: 'mark_uncollectible' } // Mark the subscription as uncollectible (inactive)
  //       });
  
  //       console.log(`Subscription ${updatedSubscriptionId} paused in Stripe.`);
  
  //       // Update the subscription status in MongoDB to "inactive"
  //       const result = await Subscription.updateOne(
  //         { stripeSubscriptionId: updatedSubscriptionId },
  //         {
  //           status: 'inactive', // Set to inactive in the database
  //           currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000) // Update the period end
  //         }
  //       );
  
  //       if (result.modifiedCount > 0) {
  //         console.log(`Subscription ${updatedSubscriptionId} updated to 'inactive' in the database.`);
  //       } else {
  //         console.log('No changes made to the database for:', updatedSubscriptionId);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error updating subscription:', error);
  //   }
  // }
  else
  {
    console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).json({ received: true });

}


async function getallactivesubscription(req , res)
{
  const subscription = await Subscription.find()
  .populate('userId')
  .populate('planId');
 
  return res.send(subscription);
}

async function getallusersubscription(req, res) {
  try {
    const userSubscriptions = await User.aggregate([
      {
        $lookup: {
          from: 'subscriptions', // The name of the Subscription collection
          localField: '_id',
          foreignField: 'userId',
          as: 'subscriptions'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          subscriptions: 1
        }
      }
    ]);

    res.send(userSubscriptions);
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).send({ error: error.message });
  }
}

async function gettingalluserwithsubscription(req , res)
{
  const subscription = await Subscription.find();
  // console.log(subscription);
  res.send(subscription);

}

async function getalltransactiondetail(req , res)
{
  const transaction = await Transaction.find()
  .populate('userId')
  .populate('planId');
  res.send(transaction);
}


async function activateDeactivatePauseSubscription(req, res) {
  const subscriptionId = req.body.Stripesubscription_id; // Ensure subscriptionId matches request body
  const status_of_subscription = req.body.status;


  // Find the subscription in your database
  const existingSubscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionId });
  if (!existingSubscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  try {
    let stripeSubscription;

    if (status_of_subscription.toLowerCase() === "active") { // Normalizing status comparison
      // Resume the subscription
      stripeSubscription = await stripe.subscriptions.update(subscriptionId, {
        pause_collection: null, // Remove the pause to resume the subscription
      });
      console.log("Subscription resumed (active)");
    } 
    else if (status_of_subscription.toLowerCase() === "inactive") { // Normalizing status comparison
      // Pause the subscription
      stripeSubscription = await stripe.subscriptions.update(subscriptionId, {
        pause_collection: { behavior: 'mark_uncollectible' }, // Mark the subscription as uncollectible
      });
      console.log("Subscription paused (inactive)");
    } 
    else if (status_of_subscription.toLowerCase() === "canceled") { // Normalizing status comparison
      // Cancel the subscription
      stripeSubscription = await stripe.subscriptions.cancel(subscriptionId); 
      console.log("Subscription cancelled");
    } 
    else {
      return res.status(400).json({ message: 'Invalid status provided' });
    }

    // Send back a success response
    res.status(200).json({
      message: `Subscription ${status_of_subscription} successfully!`,
      subscription: stripeSubscription,
    });

  } catch (error) {
    console.error(`Error processing subscription: ${error.message}`);
    res.status(500).json({ message: `Error processing subscription: ${error.message}`, error });
  }
}





module.exports = {checkout , checkoutwithwebhookconfirmation , getallactivesubscription , gettingalluserwithsubscription , gettingtransactiondetailwithwebhook , getalltransactiondetail , activateDeactivatePauseSubscription}