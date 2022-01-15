const Product = require('../models/Product');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product)=>{
        if(err){
            return res.status(400).json({
                error: 'Something went wrong!',
            })
        }
        if(!product){
            return res.status(200).json({
                message: 'No product found'
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    const product = new Product(req.body);

    product.save((err, createdProduct) => {
        if(err){
            res.status(400).json({
                error: 'Unable to create product',
            })
        }
        res.status(200).json({
            product: createdProduct,
        })
    });
};

exports.getProduct = (req, res) => {
    if(!req?.product?._id){
        return res.status(200).json({
            message: 'No product found',
        })
    };
    res.status(200).json({
        product: req.product
    })
};

exports.updateProduct = (req, res) => {
    if(!req?.product?._id){
        return res.status(200).json({
            message: 'No product found',
        })
    };

    Product.findByIdAndUpdate(
        {_id: req.product._id},
        { $set: req.body },
        { new: true, useFindAndModify: true },
        (err, updatedProduct) => {
            if(err){
                return res.status(400).json({
                    error: 'Unable to update product',
                })
            }
            res.status(200).json({
                product: updatedProduct,
            });
        }
    );
};

exports.deleteProduct = (req, res) => {
    if (!req?.product?._id) {
        return res.status(200).json({
            message: 'No product found',
        })
    };

    Product.findByIdAndDelete(
        { _id: req.product._id.toString()},
        (err, deletedProduct) => {
            if(err){
                return res.status(400).json({
                    error: 'Unable to delete Product',
                })
            }
            if(!deletedProduct){
                return res.status(400).json({
                    error: 'Something went wrong!'
                });
            }
            return res.status(200).json({
                product: deletedProduct,
            })
        }
    );
};
