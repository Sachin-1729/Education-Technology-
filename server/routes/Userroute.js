const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/Usercontroller');

router.post('/signup' , usercontroller.signup);
router.post('/signin' , usercontroller.signin);
router.get('/getalluser' , usercontroller.getalluser);
router.post('/getsingleuser' , usercontroller.getsingleuser);
router.post('/updateuser' , usercontroller.updateuser);
router.post('/deleteuser' , usercontroller.deleteuser);
router.post('/getuserexceptloginadmin' , usercontroller.getuserexceptloginadmin);
router.post('/myprofile' , usercontroller.myprofile);
 
module.exports = router;  