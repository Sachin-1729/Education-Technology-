const express = require('express');
const router = express.Router();
const subscriptioncontroller = require('../controller/Subscriptioncontroller');

router.post('/checkoutwithwebhook' ,  express.raw({ type: 'application/json' }), subscriptioncontroller.checkoutwithwebhookconfirmation);
router.post('/transactionwithwebhook' ,  express.raw({ type: 'application/json' }), subscriptioncontroller.gettingtransactiondetailwithwebhook);


module.exports = router;