const express = require('express');
const chartController = require('../controllers/chart');
const router = express.Router();


router.post('/post-Chart-Data', chartController.postChartData);

router.get('/get-chart-data', chartController.getChartData);

router.get('/get-bar-chart-data', chartController.getBarChartData);

router.get('/get-chartType', chartController.getAggrigateQueryResult);

module.exports = router;
