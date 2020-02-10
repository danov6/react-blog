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

router.get('/', (req, res, next) => {
  return Article.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Article.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    article: req.article.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }

  if(typeof body.keyword !== 'undefined') {
    req.article.keyword = body.keyword;
  }

  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Article.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;