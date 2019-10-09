const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const compression = require('compression');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://yashi:yashi1234@assessment-kxcep.mongodb.net/assignment';
const schedule = require('node-schedule');
const fileSystem = require('./controllers/fileSystem');
const app = express();

// scheduled job which will run after every 5 minutes to transform data and write to csv file
schedule.scheduleJob('*/5 * * * *', fileSystem.writeCsvdata);


const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/chart');
const fileSystemRoutes = require('./routes/fileSystem');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
});

app.use(
    session({
        secret: 'my secret',
        resave: false, // session will not save
        saveUninitialized: false, // ensures that session will not save
        store: store
    })
);

// Session is checked in this middleware for every request
app.use((req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user._id)
            .then(user => {
                req.session.user = user;
                next();
            })
            .catch(err => console.log(err));
    }
        next();
});

app.use(authRoutes);
app.use(chartRoutes);
app.use(fileSystemRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.port || 3000);
        console.log(`app connected at ${process.env.port || 3000}`)
    })
    .catch(err => {
        console.log(err);
    });
