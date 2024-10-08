const express = require('express');
const router = express.Router();
const subscriptioncontroller = require('../controller/Subscriptioncontroller');

router.post('/checkout' , subscriptioncontroller.checkout);
router.get('/subscribe' , subscriptioncontroller.getallactivesubscription);
router.get('/subscription' , subscriptioncontroller.gettingalluserwithsubscription)
router.get('/transaction' , subscriptioncontroller.getalltransactiondetail)
router.post('/modifysubscription' , subscriptioncontroller.activateDeactivatePauseSubscription)


module.exports = router;