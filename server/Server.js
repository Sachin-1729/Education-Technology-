const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const mongoose = require("mongoose");
const cors = require("cors");
const Role = require('./model/Rolemodel'); // Import Role model (even if not used)
const Membership = require('./model/MembershipModel');
const Subscription = require('./model/Subscriptionmodel');
const Content = require('./model/Contentmodel');
app.use(cors());
const userRoute = require('./routes/Userroute'); 
const planRoute = require('./routes/Planroute');
const paymentroute = require('./routes/SubscriptionRoute');
const webhookroute = require('./routes/webhookroute');
const userpurchasedplan = require('./routes/Userplanroutes')
const contentroute = require('./routes/Contentroute')



const port = 7000;
app.use('/webhook', bodyParser.raw({ type: 'application/json' }), webhookroute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = "mongodb://localhost:27017/Membership";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use('/users' , userRoute)
  app.use('/plans' , planRoute)
  app.use('/payment' , paymentroute)
  app.use('/purchased' , userpurchasedplan)
  app.use('/content' , contentroute)
  

 

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!"); 
});

