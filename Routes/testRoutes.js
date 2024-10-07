const express = require("express");
const router = express.Router();
const testController = require('../Controllers/test');

// Define the POST route
router.post('/post', testController.testPost);
router.get('/get',testController.testGet);
router.get('/get/:id',testController.testById);

module.exports = router;
