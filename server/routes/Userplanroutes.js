const express = require('express');
const router = express.Router();
const userplancontroller = require('../controller/Userplanscontroller')



router.post('/userpurchasedplan' , userplancontroller.userpurchasedplan)




module.exports = router;