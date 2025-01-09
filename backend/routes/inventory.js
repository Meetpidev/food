const express = require('express');
const inventory = require("../controller/inventory.js");

const router = express.Router();

router.post('/add', inventory.addItem);
router.get('/inven', inventory.getAllItems);
router.get('/check-expiry', inventory.checkExpiryItems);

module.exports = router;