const express = require('express');
const {addLogin,addMin,getAdminProfile} = require("../controller/admin.js");


const router = express.Router();

router.post("/signup",addMin);
router.post("/login",addLogin);
router.get("/profile/:id",getAdminProfile);
module.exports = router;

