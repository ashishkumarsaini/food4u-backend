const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
    },
    last_name: {
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
    encrypt_password: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encrypt_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (inputPassword) {
        return this.securePassword(inputPassword) === this.encrypt_password;
    },
    securePassword: function (inputPassword) {
        if (!inputPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt).update(inputPassword).digest('hex');
        }
        catch (err) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);
