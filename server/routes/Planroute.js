const express = require('express');
const router = express.Router();
const plancontroller = require('../controller/MembershipController');

router.post('/createplan' , plancontroller.createplan);
router.get('/getallplan' , plancontroller.gettingAllPlan);
router.post('/getsingleproducts' , plancontroller.gettingSingleproducts);
router.post('/updateplan' , plancontroller.updateplan);
router.post('/deleteproduct' , plancontroller.deleteproduct);
module.exports = router;
