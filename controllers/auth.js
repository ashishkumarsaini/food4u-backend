const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.signUp = (req, res) => {
    const user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) {
            return res.status(400).json({
                err: 'Failed to create user.',
            });
        }

        user.salt = undefined;
        user.encrypt_password = undefined;

        return res.json({
            user: user,
        });
    });
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err){
            return res.status(400).json({
                error: 'Unable to signin.',
            })
        }
        if(!user){
            return res.status(400).json({
                error: 'User email does not exist.'
            })
        }

        if (!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password does not match'
            })
        }

        user.salt = undefined;
        user.encrypt_password = undefined;

        const token = jwt.sign({ _id: user._id }, 'secret', { algorithm: 'HS256' });
        res.cookie('token', token , { expire: new Date() + 9999 });

        return res.status(200).json({
            token,
            user: user,
        })
    })
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//
exports.isSignedIn = expressJWT({
    secret: 'secret',
    userProperty: 'auth',
    algorithms: ['HS256']
});

exports.isAuthenticate = (req, res, next) => {
    const checkAuthenticate = req.profile && req.auth && req.profile._id?.toString() === req.auth._id || false;
    if(!checkAuthenticate){
        return res.status(400).json({
            error: 'ACCESS DENIED',
        });
    }
    next();
};

exports.isAdmin = (req, res) => {
    if (req?.profile?.privilege !== 2){
        return res.status(400).json({
            error: 'ACCESS DENIED, You are not an admin.'
        });
    }
    next();
};

