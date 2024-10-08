const express = require('express');
const router = express.Router();
const Contentcontroller = require('../controller/Contentcontroller');

const uploadMultiple  = require('../middleware/Multer');
const verifyusersubscription = require("../middleware/Verifyusersubscription");

router.post('/createcontent' , uploadMultiple , Contentcontroller.contentcreate);
router.get('/getallcontent' , Contentcontroller.getallcontent);
router.post('/getcontentbyplan' , Contentcontroller.getcontentbyplan);
router.post('/getsinglecontent' , Contentcontroller.getsinglecontent);
router.post('/updatecontent' , uploadMultiple, Contentcontroller.updatecontent);
router.post('/deletecontent' , Contentcontroller.deletecontent);
router.post('/getcontentbyplanforuser' ,verifyusersubscription  ,Contentcontroller.gettingcontentforuserbyplan);
router.post('/gettingcardofconetent' , Contentcontroller.gettingcontentforuserbyplanonbasisofplan)
router.post('/gettingcurrentactivesubscription' , Contentcontroller.gettingcurrentactivesubscription)

module.exports = router;