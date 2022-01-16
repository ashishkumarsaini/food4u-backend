const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err){
            return res.status(400).json({
                error: 'Something went wrong! Unable to find user.',
            })
        }
        if(!user){
            return res.status(400).json({
                error: 'User does not exists',
            })
        }
        user.salt = undefined;
        user.encrypt_password = undefined;
        req.profile = user
        next();
    });
};

exports.getUser = (req, res) => {
    if(!req.profile?._id){
        return res.status(400).json({
            error: 'User does not exists',
        })
    };
    return res.status(200).json({
        user: req.profile,
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id},
        { $set: req.body },
        { new: true, useFindAndModify:true },
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: 'Unable to update the user'
                })
            }
            user.salt = undefined;
            user.encrypt_password = undefined;
            res.status(200).json({
                user: user,
            })
        }
    )
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete({ _id: req.profile?._id.toString()},(err, user)=>{
        if(err){
            res.status(400).json({
                error: 'Unable to delete user',
            })
        }
        return res.json({
            message: 'User deleted!',
            user: user,
        })
    });
};

exports.getPurchasedOrders = (req, res) => {
    if (!req.profile?._id) {
        return res.status(400).json({
            error: 'Unable to find user',
        })
    }
    return res.status(200).json({
        purchases: req.profile.purchases,
    });
}
