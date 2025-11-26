const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [
        {
            url:{
                type: String,
                
            },
            public_id:{
                type: String,
            
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    seller : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
