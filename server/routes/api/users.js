const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const email_validator = require("email-validator");

//Env variable
const secret = "SUPER-SECRET-MF-PASSWORD";

//Create User
router.post('/signup', (req, res, next) => {
    if (req.body.email && email_validator.validate(req.body.email)) {
        User.findOne({'email': req.body.email}).exec().then(function (usr) {
            //Check if email was found
            if (usr) {
                res.json({error: [req.body.email + ' is already registered, please log in instead']});
            } else {
                User.findOne({'username': req.body.username}).exec().then(function (usr) {
                    //Check if username was found
                    if (usr) {
                        res.json({error: ['Username ' + req.body.username + ' is already registered, please use another']});
                    } else {
                        // Create new user
                        let newUser = new User();
                        newUser.full_name = req.body.full_name;
                        newUser.email = req.body.email;
                        newUser.password = newUser.generateHash(req.body.password);
                        newUser.username = req.body.username;
                        newUser.account_type = "free";
                        // if (req.body.email === god_mode_email) {
                        //     newUser.role = "admin";
                        //     newUser.permissions = ["all"];
                        // }
                        newUser.save().then(function () {
                            console.log("[ auth ] NEW USER CREATED: ".green + newUser.email);
                            res.json({email: req.body.email});
                        }, function (err) {
                            console.log("[ auth ] Error saving new user".red, err);
                            // Build model validation error array
                            let errObj = err.toJSON().errors;
                            let errArr = [];
                            for (let e in errObj) {
                                // Skip loop if the property is from prototype
                                if (!errObj.hasOwnProperty(e)) continue;
                                errArr.push(errObj[e].message);
                            }
                            // Respond with validation errors
                            res.json({error: errArr});
                        });
                    }
                },
                function (err) {
                    console.log("[ auth ] Error finding one user".red, err);
                    res.json({error: ['Error fetching user']});
                });
            }
        }, function (err) {
            console.log("[ auth ] Error finding one user".red, err);
            res.json({error: ['Error fetching user']});
        });
    } else {
        res.json({error: ['Please submit a valid email address']});
    }
});

//Login
router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username) {
        if(username.indexOf('@') != -1){
          User.findOne({'email': username}).exec().then(function (usr) {
            if(!usr || !usr.validPassword(password)) {
                res.json({error: ['Invalid email or password']});
            }else {
                // All is well, return auth token
                let user = {_id: usr._id};
                let token = jwt.sign(user, secret, {expiresIn: '7d'}); // Expires in 1 week

                res.json({token: token});
            }
          }, function (err) {
              console.log("[ auth ] Error finding one user".red, err);
              res.json({error: ['Error fetching user']});
          });
        }else{
          User.findOne({'username': username}).exec().then(function (usr) {
            if(!usr || !usr.validPassword(password)) {
                res.json({error: ['Invalid email or password']});
            }else {
                // All is well, return auth token
                let user = {_id: usr._id};
                let token = jwt.sign(user, secret, {expiresIn: '7d'}); // Expires in 1 week

                console.log('[ auth ] Token: ' + token);
                res.json({token: token});
            }
          }, function (err) {
              console.log("[ auth ] Error finding one user".red, err);
              res.json({error: ['Error fetching user']});
          });
        }

    } else {
        res.json({error: ['Please submit a valid email address']});
    }
});

router.get('/profile', (req,res, next) => {
  if (!req.user) {
    res.json({error: ['Not authorized']});
  } else {
    console.log("[ users ] New login :::::::::::::::::::::::::::::::::::::::::::: ".magenta + req.user._id);
    User.findOne({'_id': req.user._id}, {
        'password': 0,
    }).exec().then(function (u) {
        if(u){
          res.json(u);
        }else{
          res.json({error: ['User not found']});
        }
    }, function (err) {
        console.log("[ users ] Error finding one user by _id".red, err);
        res.json({error: ['Error fetching user from database']});
    });
  }
});

module.exports = router;