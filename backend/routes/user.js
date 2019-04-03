const express = require('express');
const bcyrpt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    //encrypts the password
    bcyrpt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Successful',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'Auth failed'
                });
            }
            return bcyrpt.compare(req.body.password, user.password)

            //cant actually check if the password is correct as is its been encrypted
            // and cannot be unhasehed. Bcrypt offers a compare function though so we can determine 
            // if the password is correect
        })
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: 'Auth failed'
                });
            }
            const token = jsonWebToken.sign(
                { email: user.email, userId: user._id },
                'secret_this_should_be_longer', 
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
