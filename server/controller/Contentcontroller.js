const express = require("express");
const multer = require("multer");

const Content = require("../model/Contentmodel");
const Subscription = require("../model/Subscriptionmodel");
const User = require("../model/Usermodel");

const router = express.Router();

async function contentcreate(req, res) {
  try {
    console.log(req.body);
    console.log(req.files);
    console.log(req.files.videos);
    console.log(req.files.documents);

    const plan_id = req.body.planId;
    const content_title = req.body.contentTitle;
    const content_description = req.body.contentDescription;
    // Extracting video and document files from req.files
    const videos = req.files.videos || []; // Default to empty array if no videos
    const documents = req.files.documents || []; // Default to empty array if no documents

    // Prepare arrays of video and document details for saving in the database
    const videoDetails = videos.map((video) => ({
      url: video.path, // Path to the uploaded video file
    }));

    const documentDetails = documents.map((document) => ({
      url: document.path, // Path to the uploaded document file
    }));

    const newContent = new Content({
      planId: plan_id,
      videos: videoDetails,
      documents: documentDetails,
      Content_title: content_title,
      Content_description: content_description,
    });

    await newContent.save();

    // Return a successful response
    res
      .status(201)
      .json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error("Error creating content:", error);
    res
      .status(500)
      .json({ message: "Error creating content", error: error.message });
  }
}

async function editcontent(req, res) {}

async function getsinglecontent(req, res) {
  const id = req.body.id;
  console.log(id);
  const content = await Content.findById(id);
  return res.status(200).json(content);
}

async function getallcontent(req, res) {
  const content = await Content.find().populate("planId");
  return res.status(200).json(content);
}

async function getcontentbyplan(req, res) {
  const content = await Content.find({ planId: req.body.planId }).populate(
    "planId"
  );
  return res.status(200).json(content);
}

async function deletecontent(req, res) {
  const id = req.body.id;
  const result = await Content.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ message: "Content not found" });
  }
  return res.status(200).json({ message: "Content deleted successfully" });
}

async function updatecontent(req, res) {
  try {
    console.log("nfsnfjrnf");
    console.log(req.body);
    console.log(req.files);
    const id = req.body.id;
    console.log(id);
    const videos = req.files.videos || []; // Default to empty array if no videos
    const documents = req.files.documents || []; // Default to empty array if no documents
    const plan_id = req.body.planId;
    const content_title = req.body.contentTitle;
    const content_description = req.body.contentDescription;
    const videoDetails = videos.map((video) => ({
      url: video.path, // Path to the uploaded video file
    }));
    const documentDetails = documents.map((document) => ({
      url: document.path, // Path to the uploaded document file
    }));

    const content = await Content.findById(id);

    content.videos = videoDetails;
    content.documents = documentDetails;
    content.planId = plan_id;
    content.Content_title = content_title;
    content.Content_description = content_description;

    await content.save();
    return res.status(200).json({ message: "Content updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating content", error: error.message });
  }
}

async function gettingcontentforuserbyplan(req, res) {
  const plan_id = req.body.plan_id;
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: req.body.subscription_id_stripe,
  });
  if (subscription) {
    const plan_id = subscription.planId;

    console.log("jknknfkje", plan_id);
    const content = await Content.find({ planId: plan_id }).populate("planId");
    console.log(content);

    return res.send(content);
  }

  res.send("Error");
}
async function gettingcontentforuserbyplanonbasisofplan(req, res) {
  const plan_id = req.body.plan_id;
  const usertoken = req.body.userToken;

  const user = await User.findOne({ token: usertoken });

  const id = user._id;

  const subscription = await Subscription.find({ userId: id, planId: plan_id });

  if (subscription) {
    subscription.map((subscribed) => {
      
      if (subscribed.status === "active") {
        console.log(subscribed);
        res.send({subscribed: subscribed});
      }else if(subscribed.status === "canceled"){
        console.log(subscribed);
        res.send({subscribed: subscribed });
      }
      else{
        console.log(subscribed);
        res.send({subscribed : subscribed });
      }
    });
  }
}

async function gettingcurrentactivesubscription(req, res) {
  try {
    const usertoken = req.body.userToken;

    // Find the user based on the provided token
    const user = await User.findOne({ token: usertoken });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const id = user._id;
    let plan_id =[];
    // Find all subscriptions for the user
    const subscriptions = await Subscription.find({ userId: id });

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).send({ message: "No subscriptions found" });
    }

    // Filter out active subscriptions
    const activeSubscriptions = subscriptions.filter(sub => sub.status === "active");
    console.log(activeSubscriptions , "Active"); 

    // Extract the plan IDs from the active subscriptions
    activeSubscriptions?.map((sub) => {
      plan_id.push(sub?.planId);
    });

    // Send the array of active subscriptions
    if (activeSubscriptions.length > 0) {
      res.send({ activeplan: plan_id });
    } else {
      res.send({ message: "No active subscriptions found" });
    }
  } catch (error) {
    console.error("Error fetching active subscriptions: ", error);
    res.status(500).send({ error: "Server error" });
  }
}



module.exports = {
  contentcreate,
  getallcontent,
  getcontentbyplan,
  getsinglecontent,
  updatecontent,
  deletecontent,
  gettingcontentforuserbyplan,
  gettingcontentforuserbyplanonbasisofplan,
  gettingcurrentactivesubscription
};
