const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    products: {
        type: Array,
        default: []
    },
    order_to_display: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    }
});

module.exports = mongoose.model('Category', categorySchema);
