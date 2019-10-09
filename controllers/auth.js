const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.postLogin = (req, res, next) => {
    const userId = req.body.userId;
    const password = req.body.password;
    User.findOne({ userId: userId })
        .then(user => {
            if (!user) {
                res.status(200).json({
                    message: 'user not found!!'
                });
            }
            else {
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            req.session.save();
                            res.status(200).json({
                                message: 'Welcome',
                                login: true
                            });
                        }
                        else {
                            res.status(200).json({
                                message: 'Incorrect Password',
                                login: false
                            });
                        }
                    })
                    .catch(err => {
                        console.log("Inside Catch 2"+err);
                    })
            }
        })
        .catch(err => console.log("Inside Catch 3"+err));
};

exports.postSignup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userId = req.body.userId;
    const password = req.body.password;

    User.findOne({ userId: userId })
        .then(userDoc => {
            if (userDoc) {
                res.status(200).json({
                    message: 'user already exist',
                    signUp : false
                });
            }
            return bcrypt.hash(password, 12)
                .then(hasedPaswrd => {
                    const user = new User({ firstName: firstName, lastName: lastName, userId: userId, password: hasedPaswrd });
                    return user.save();
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .then(result => {
            res.status(200).json({
                message: 'Sign Up successfully done.',
                signUp :true
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    const userId = req.body.userId;
    User.findById(userId)
      .then(user => {
          console.log(req.session);
        req.session.destroy(err => {
            console.log(err);
            res.status(200).json({
                message: 'Logout successfully'
            });
        });
      })
      .catch(err => console.log(err));
  };
    

