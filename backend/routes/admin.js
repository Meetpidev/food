// const express = require('express');
// const {addLogin,addMin,getAdminProfile} = require("../controllers/admin.js");


// const router = express.Router();

// router.post("/signup",addMin);
// router.post("/login",addLogin);
// router.get("/profile/:id",getAdminProfile);
// module.exports = router;    

const express = require('express');
const { adminSignup, adminLogin } = require('../controllers/admin');
const router = express.Router();

// Admin signup route
router.post('/signup', adminSignup);

// Admin login route
router.post('/login', adminLogin);

module.exports = router;

