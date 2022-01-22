const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.signUp = (req, res) => {

    User.findOne({
        $or: [{
            email: req.body.email,
        }, {
            mobile: req.body.mobile,
        }]
        },(err, user) => {
            if(user?.email === req.body.email){
                return res.status(400).json({
                    message: 'Email already exist',
                    status: 400,
                    success: false,
                })
            }
            if(user?.mobile === req.body.mobile){
                return res.status(400).json({
                    message: 'Mobile already exist',
                    status: 400,
                    success: false,
                })
            }
            const newUser = new User(req.body);
            newUser.save((err, savedUser) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Failed to create user.',
                        status: 400,
                        success: false,
                    });
                }

                savedUser.salt = undefined;
                savedUser.encrypt_password = undefined;

            return res.status(200).json({
                result: {
                    user: savedUser,
                },
                status: 200,
                success: true,
            });
        })
    });

};

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err){
            return res.status(400).json({
                message: 'Unable to signin.',
                status: 400,
                success: false,
            })
        }
        if(!user){
            return res.status(400).json({
                message: 'User email does not exist.',
                status: 400,
                success: false,
            })
        }

        if (!user.authenticate(password)){
            return res.status(400).json({
                message: 'Email and password does not match.',
                status: 400,
                success: false,
            })
        }

        user.salt = undefined;
        user.encrypt_password = undefined;

        const token = jwt.sign({ _id: user._id }, 'secret', { algorithm: 'HS256' });
        res.cookie('token', token , { expire: new Date() + 9999 });

        return res.status(200).json({
            token,
            result: {
                user: user,
            },
            status: 400,
            success: false,
        })
    })
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully",
        status: 200,
        success: true,
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
        return res.status(403).json({
            message: 'ACCESS DENIED, You are not autheticated',
            status: 403,
            success: false,
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req?.profile?.privilege < 1){
        return res.status(400).json({
            message: 'ACCESS DENIED, You are not an admin.',
            status: 400,
            success: false,
        });
    }
    next();
};

exports.isSuperAdmin = (req, res, next) => {
    if (req?.profile?.privilege !== 2){
        return res.status(400).json({
            message: 'ACCESS DENIED, You are not a super admin.',
            status: 400,
            success: false,
        });
    }
    next();
};

