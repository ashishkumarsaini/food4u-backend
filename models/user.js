const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    salt: {
        type: String,
    },
    privilege: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('User', userSchema);
