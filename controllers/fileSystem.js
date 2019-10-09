const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Function to read data and modify the contents and produce data
exports.readCsvData = (req, res, next) => {
    let rowdata = [];
    fs.createReadStream(path.join(__dirname, '/file/demo.csv'))
        .pipe(csv())
        .on('data', (row) => {
            row.Salary = parseInt(row.Salary) + 1000; // modifying employee salary by adding 1000 
            rowdata.push(row);
        }).on('end', () => {
            res.status(200).json({
                message: 'CSV file successfully processed with modification',
                data: rowdata
            });
        });
}

// Function to read data and write it csv file
exports.writeCsvdata = () => {
    //hardcoaded file name and rRow name
    const csvWriter = createCsvWriter({
        path: path.join(__dirname, '/file/demo.csv'),
        header:  [
            { "id": "employeeName", "title": "Emplyee Name" },
            { "id": "employeeId", "title": "Employee ID" },
            { "id": "salary", "title": "Salary" }
          ]
    });

    // hardcoaded data for dummy use (data can be of 10k size)
    const data=  [
          {
            "employeeName": "John",
            "employeeId": 101,
            "salary": 35000
              }, {
            "employeeName": "Jane",
            "employeeId": 102,
                  "salary": 48000,
          }, {
            "employeeName": "Max",
            "employeeId": 103,
                  "salary": 98000
              }
        ];

    // It will write the dummy data to the demo.csv file
    csvWriter
        .writeRecords(data)
        .then(() => {
                console.log('The CSV file was written successfully')
        });
}