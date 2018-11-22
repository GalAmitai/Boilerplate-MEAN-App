const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb://admin:q1w2e3r4@ds063140.mlab.com:63140/tasksapp_gal";
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// mLab Connection
mongoose.connect(db, err => {
    if(err) {
        console.error('Error: ' + err);
    } else {
        console.error('Connected to mLab Success!');
    }
});


// Middleware to verify Token
function verifyToken(req, res, next) {

    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');

    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}


// Registration New User
router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, user) => {
        if(err) {
            console.error('Error Registration: ' + err);
        } else {
            console.log('New User Registred: ' + user.email);

            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');

            res.status(200).send({token});
        }
    });
});

// Login User
router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if(err) {
            console.error('Error: ' + err);
        } else {
            if(!user) {
                res.status(401).send('Invalid Email');
            } else if( user.password !== userData.password) {
                res.status(401).send('Invalid Password');
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    });
});

// Login User
router.get('/getAllUsers', verifyToken, (req, res) => {
    let userData = req.body;
    User.find({}, (err, users) => {
        if(err) {
            console.error('Error: ' + err);
        } else {
            if(!users) {
                res.status(401).send('Invalid');
            } else {
                res.status(200).send(users);
            }
        }
    })
});

module.exports = router;