const express = require('express');
const fileControler = require('../controllers/fileSystem');
const router = express.Router();


router.get('/read-csv-data', fileControler.readCsvData);

module.exports = router;
