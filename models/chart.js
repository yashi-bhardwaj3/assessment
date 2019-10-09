const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chartSchema = new Schema({
    chartType : {type : String},
    value : {type : {}},
});

module.exports = mongoose.model('Chart',chartSchema);