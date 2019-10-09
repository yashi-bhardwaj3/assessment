const Chart = require('../models/chart');

exports.postChartData = (req, res, next) => {
    const chartType = req.body.chartType;
    const value = req.body.value;

    const chart = new Chart({ chartType: chartType, value: value });
    return chart.save()
        .then(() => {
            res.status(200).json({
                message: 'chart created successfully',
                success: true
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getChartData = (req, res, next) => {
    Chart.find()
        .then(chart => {
            res.status(200).json({
                data: chart,
                message: 'success',
                success: true
            });
        })
        .catch(err => console.log(err));
};

exports.getBarChartData = (req, res, next) => {
    Chart.find({ chartType: 'bar' })
        .then(chart => {
            res.status(200).json({
                data: chart,
                message: 'success',
                success: true
            });
        })
        .catch(err => console.log(err));
};

exports.getAggrigateQueryResult = (req, res, next) => {
    Chart.aggregate([
        {
            $group: {
                _id: '$chartType',  //$chartType is the column name in collection
                count: { $sum: 1 }
            }
        }
    ]).then(chart => {
        res.status(200).json({
            data: chart,
            message: 'Aggregate result',
            success: true
        });
    })
        .catch(err => console.log(err));
  }