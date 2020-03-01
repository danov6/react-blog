const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

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