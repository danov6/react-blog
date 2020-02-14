const mongoose = require('mongoose');
const router = require('express').Router();
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const email_validator = require("email-validator");

//Env variable
const secret = "SUPER-SECRET-MF-PASSWORD";

//Add article
router.post('/api/articles/add', (req, res, next) => {
    if (!req.user) {
        console.log("[ Add Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        const { body } = req;
        const newArticle = new Article(body);

        //Save article to user
        User.findOne({
            '_id': req.user._id
        }).exec().then((usr) => {
            if(usr){
                usr.Articles.push(newArticle);
                usr.save((err, u) => {
                    if (err) return console.error("[ Add Article ] " + err);
                    console.log("[ Add Article ] Article saved to user: " + usr._id);
                });
            }else{
                console.log("[ Add Article ] No user found with ID: " + req.user._id);
            }
        });

        //Save article to collection
        newArticle.save((err, a) => {
            if (err) return console.error("[ Add Article ] " + err);
            console.log(`[ Add Article ] Article ${a.title} saved to collection by: ` + a.author);
            res.json({
                article: newArticle.toJSON()
            });
        });
    }
});

router.get('/articles', (req, res, next) => {
    Article.find()
    .sort({
        createdAt: 'descending'
    })
    .then((articles) => {
        console.log('[ Get Articles ] Get all articles');
        res.json({
            articles: articles.map(article => article.toJSON())
        });
    })
    .catch(next);
});

router.param('id', (req, res, next, id) => {
    Article.findById(id, (err, article) => {
        if (err) {
            return res.sendStatus(404);
        } else if (article) {
            req.article = article;
            return next();
        }
    }).catch(next);
});

router.get('/articles/:id', (req, res, next) => {
    res.json({
        article: req.article.toJSON(),
    });
});

router.patch('/api/articles/:id', (req, res, next) => {
    if (!req.user) {
        console.log("[ Update Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        const { body } = req;

        if (typeof body.title !== 'undefined') {
            req.article.title = body.title;
        }
    
        if (typeof body.author !== 'undefined') {
            req.article.author = body.author;
        }
    
        if (typeof body.body !== 'undefined') {
            req.article.body = body.body;
        }
    
        if (typeof body.keyword !== 'undefined') {
            req.article.keyword = body.keyword;
        }
    
        req.article.save()
        .then((a) => {
            console.log("[ Update Article ] Article updated: " + a._id);
            res.json({
                article: req.article.toJSON()
            });
        })
        .catch(next);
    }
});

router.delete('/api/articles/:id', (req, res, next) => {
    if (!req.user) {
        console.log("[ Delete Article ] User is not authorized");
        res.json({
            error: ['Not authorized']
        });
    } else {
        let articleId = req.article._id;
        Article.findByIdAndRemove(articleId)
        .then(() => {
            console.log(`[ Delete Article ] Article ${req.article.title} removed from collection`);
            //Save article to user
            User.findOne({
                '_id': req.user._id
            }).exec().then((usr) => {
                if(usr){
                    usr.Articles = usr.Articles.filter((a) => {
                                        return (a._id !== articleId);
                                    });
                    console.log(usr.Articles);                
                    usr.save((err, u) => {
                        if (err) return console.error("[ Delete Article ] " + err);
                        console.log("[ Delete Article ] Article removed from user: " + usr._id);
                        res.json({
                            user: u
                        });
                    });
                }else{
                    console.log("[ Delete Article ] No user found with ID: " + req.user._id);
                    res.json({
                        error: ['No user found']
                    });
                }
            });
        });
    }
});

//Create User
router.post('/users/signup', (req, res, next) => {
    if (req.body.email && email_validator.validate(req.body.email)) {
        User.findOne({
            'email': req.body.email
        }).exec().then(function(usr) {
            //Check if email was found
            if (usr) {
                console.log("[ Signup ] Email is already registered, please log in: " + req.body.email);
                res.json({
                    error: [req.body.email + ' is already registered, please log in instead']
                });
            } else {
                User.findOne({
                    'username': req.body.username
                }).exec().then((usr) => {
                        //Check if username was found
                        if (usr) {
                            console.log("[ Signup ] Username is already picked, please choose another: " + req.body.username);
                            res.json({
                                error: ['Username ' + req.body.username + ' is already registered, please use another']
                            });
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
                            newUser.save().then(function() {
                                console.log("[ auth ] NEW USER CREATED: ".green + newUser.email);
                                res.json({
                                    email: req.body.email
                                });
                            }, function(err) {
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
                                res.json({
                                    error: errArr
                                });
                            });
                        }
                    },
                    function(err) {
                        console.log("[ Signup ] Error finding one user".red, err);
                        res.json({
                            error: ['Error fetching user']
                        });
                    });
            }
        }, function(err) {
            console.log("[ Signup ] Error finding one user".red, err);
            res.json({
                error: ['Error fetching user']
            });
        });
    } else {
        res.json({
            error: ['Please submit a valid email address']
        });
    }
});

//Login
router.post('/users/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username) {
        if (username.indexOf('@') != -1) {
            User.findOne({
                'email': username
            }).exec().then(function(usr) {
                if (!usr || !usr.validPassword(password)) {
                    res.json({
                        error: ['Invalid email or password']
                    });
                } else {
                    // All is well, return auth token
                    let user = {
                        _id: usr._id
                    };
                    let token = jwt.sign(user, secret, {
                        expiresIn: '7d'
                    }); // Expires in 1 week

                    res.json({
                        token: token
                    });
                }
            }, function(err) {
                console.log("[ auth ] Error finding one user".red, err);
                res.json({
                    error: ['Error fetching user']
                });
            });
        } else {
            User.findOne({
                'username': username
            }).exec().then(function(usr) {
                if (!usr || !usr.validPassword(password)) {
                    res.json({
                        error: ['Invalid email or password']
                    });
                } else {
                    // All is well, return auth token
                    let user = {
                        _id: usr._id
                    };
                    let token = jwt.sign(user, secret, {
                        expiresIn: '7d'
                    }); // Expires in 1 week

                    console.log('[ auth ] Token: ' + token);
                    res.json({
                        token: token
                    });
                }
            }, function(err) {
                console.log("[ auth ] Error finding one user".red, err);
                res.json({
                    error: ['Error fetching user']
                });
            });
        }

    } else {
        res.json({
            error: ['Please submit a valid email address']
        });
    }
});

router.get('/api/users/profile', (req, res, next) => {
    if (!req.user) {
        res.json({
            error: ['Not authorized']
        });
    } else {
        User.findOne({
            '_id': req.user._id
        }, {
            'password': 0,
        }).exec().then(function(u) {
            if (u) {
                res.json(u);
            } else {
                res.json({
                    error: ['User not found']
                });
            }
        }, function(err) {
            console.log("[ users ] Error finding one user by _id".red, err);
            res.json({
                error: ['Error fetching user from database']
            });
        });
    }
});
module.exports = router;