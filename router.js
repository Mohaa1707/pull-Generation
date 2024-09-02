// router.js
const express = require('express');
const router = express.Router();
const { executeQuery, InsertDetails, amtPull } = require('./module/pullDetails/pullDetails');
// const { InsertDetails } = require('./module/insertDetails/insertDetails');

router.post('/api/executeQuery', executeQuery);
router.post('/api/InsertDetails', InsertDetails);
router.get('/api/amtPull/:isbn', amtPull);

module.exports = router;
