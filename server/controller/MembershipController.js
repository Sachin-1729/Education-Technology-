const Membership = require("../model/MembershipModel");
const User = require("../model/Usermodel");
const stripe = require('stripe')('your stripe private key');

// Create a new plan

async function createplan(req , res)
{ 

   

   try {
    const plan = await stripe.plans.create({
      amount: req.body.Productprice*100, // Amount in cents (e.g., $20.00)
      interval: 'month', // Billing frequency (e.g., month, year)
      product: {
        name: req.body.ProductName,
       
      },
      currency: 'inr', // Currency code (e.g., usd, eur) 
    });
    if(plan)
    {    
            const Productname = req.body.ProductName;
            const Productprice = req.body.Productprice; 
            const  Billingpriod = 'monthly';
            const planid = plan.id;

            const newmembership = new Membership({
                Productname: Productname,
                plan_id: planid,
                PriceinInr: Productprice,
                Billingpriod: 'Monthly',
                productDescription: req.body.ProductDetail
            });
            await newmembership.save();
            return res.status(200).json({ message: 'Plan created successfully' });

    }
    
  } catch (error) {
    console.error('Error creating plan:', error);
  }
    


}


async function gettingAllPlan(req , res)
{
   const plan = await Membership.find();
  //  const prices = await stripe.prices.list();
  //  console.log(prices);
   res.send(plan);
}

async function gettingSingleproducts(req , res)
{
   console.log(req.body);
   const plan_id= req.body.id;
   const productdetail = await Membership.findById(plan_id);
  //  console.log(productdetail);
   const product_id = productdetail.plan_id;
  //  console.log(product_id);

   //const product = await stripe.products.retrieve(product_id);
   res.send({Productname: productdetail.Productname ,PriceinInr:productdetail.PriceinInr });

   
}
async function updateplan(req, res) {
  try {
    console.log(req.body);

    const membership_id = req.body.membership_id_of_our_database;
    const membership = await Membership.findById(membership_id);

    // Assuming membership.productid stores the price ID (plan ID)
    const plan_id = membership.plan_id;

    // Retrieve the price object using the plan/price ID
    const price = await stripe.prices.retrieve(plan_id);
    const productId = price.product;

    // Log productId to ensure it's the correct one
    console.log(`Product ID retrieved from Stripe: ${productId}`);

    // Update the product name in Stripe
    const updatedProduct = await stripe.products.update(productId, {
      name: req.body.Productname,
    });

    // Log the product update response
    console.log('Updated product:', JSON.stringify(updatedProduct, null, 2));

    // If the product was successfully updated
    if (updatedProduct) {
      // Create a new price for the product
      const newPrice = await stripe.prices.create({
        unit_amount: req.body.Price * 100, // Price in paise/cents (INR)
        currency: 'inr', // Assuming INR currency
        product: productId, // Link to the product
        recurring: { interval: 'month' }, // Assuming monthly billing for this example
      });

      // Log the new price creation
      console.log('New price created:', JSON.stringify(newPrice, null, 2));
      const a =  newPrice;
      console.log("ndjnejkewnf",JSON.stringify(a.id));

      // Update your local database (MongoDB)
      membership.Productname = req.body.Productname; // Update product name in the database
      membership.productid = newPrice.id; // Save the new price (plan ID) in the database
      membership.PriceinInr = req.body.Price; // Update the new price in INR
      membership.plan_id = a.id;
      

    
      await membership.save(); // Save the changes
 
      // Send a success response with updated product and price
      res.status(200).send({ 
        message: 'Product and price updated successfully', 
        updatedProduct, 
        newPrice 
      });
    }
  } catch (error) {
    console.error('Error updating product or price:', error);
    res.status(500).send({ error: error.message });
  }
}


async function deleteproduct(req , res)
{ 

console.log(req.body);
const membership_id = req.body.iid;
const membership = await Membership.findById(membership_id);
const plan_id = membership.plan_id;
const price = await stripe.prices.retrieve(plan_id);
const productId = price.product;
const prices = await stripe.prices.list({
  product: productId,
});
// Check if prices were returned
if (prices.data.length === 0) {
  console.log('No prices found for the given product.');
  return;
}
console.log(Object.keys(stripe.prices));
// Iterate over the list and delete each price
for (const price of prices.data) {
  try {
    // Check if the price ID is valid
    if (price.id) {  
      // Delete the price
      const deletedPrice = await stripe.prices.del(price.id);
      console.log(`Deleted price: ${deletedPrice.id}`);
    } else {
      console.log(`Invalid price ID: ${price.id}`);
    }
  } catch (error) {
    console.error(`Error deleting price with ID ${price.id}:`, error);
  }
}

console.log('All prices processed.');

 

// if(deletedProduct) 
// {
//   const deletedmembership = await Membership.findByIdAndDelete(membership_id);
//   if(deletedmembership)
//   {
//     return res.status(200).json({ message: 'Plan deleted successfully' });
//   }
// }
}



module.exports = {createplan ,gettingAllPlan , gettingSingleproducts , updateplan , deleteproduct}