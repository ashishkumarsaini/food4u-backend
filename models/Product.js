const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000,
    },
    price: {
        current_price: {
            type: Number,
            required: true,
            maxLength: 32,
            trim: true,
        },
        max_current_price: {
            type: Number,
            required: true,
            maxLength: 32,
            trim: true,
        },
        compare_price: {
            type: Number,
            required: true,
            maxLength: 32,
            trim: true,
        },
        max_compare_price:{
            type: Number,
            required: true,
            maxLength: 32,
            trim: true,
        },
    },
    // category: {
    //     type: ObjectId,
    //     ref: 'Category',
    //     required: true,
    // },
    image: {
        alt: {
            type: String,
            required: true,
            trim: true,
            maxLength: 150
        },
        url: {
            type: String,
            required: true,
            trim: true,
        }
    },
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    }
},{ timestamp: true });

module.exports = mongoose.model('Product', productSchema);