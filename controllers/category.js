const Category = require("../models/Category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category)=>{
        if(err){
            return res.status(400).json({
                error: 'Something went wrong! Unable to find category',
            });
        }
        if(!category){
            return res.status(200).json({
                message: 'Category not found.'
            });
        }
        req.category = category;
        next();
    });
}

exports.createCategory = (req, res) =>{
    const category = new Category(req.body);

    category.save((err, savedCategory )=>{
        if (err || !savedCategory){
            return res.status(400).json({
                error: 'Unable to save category!'
            })
        }
        res.status(200).json({
            category: savedCategory
        })
    })
};

exports.getCategory = (req, res) => {
    if(!req?.category?._id){
        return res.status(400).json({
            error: 'Category not found!',
        });
    }
    return res.status(200).json({
        category: req.category,
    });
};

exports.updateCategory = (req, res) => {
    if (!req?.category?._id) {
        return res.status(400).json({
            error: 'No category found',
        });
    }

    Category.findByIdAndUpdate(
        { _id: req.category._id},
        { $set: req.body },
        { new: true, useFindAndModify: true },
        (err, updatedCategory) => {
            if(err){
                return res.status(400).json({
                    error: 'Unable to update category',
                });
            }
            if(!updatedCategory?._id){
                return res.status(200).json({
                    message: 'No category found.'
                });
            }
            return res.status(200).json({
                category: updatedCategory
            });
        }
    )
}

exports.getAllCategories = (req, res) => {
    Category.find().sort({ order_to_display: 1 }).exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: 'Unable to find categories.',
            });
        }
        if(!categories.length){
            return res.status(200).json({
                error: 'No categories found',
            });
        }
        return res.status(200).json({
            categories: categories
        });
    });
};

exports.deleteCategory = (req, res) => {
    if(!req?.category?._id){
        return res.status(400).json({
            error: 'No category found',
        });
    }
    Category.findByIdAndDelete(
        { _id: req.category._id },
        (err, deletedCategory) => {
            if(err){
                return res.status(400).json({
                    error: 'Unable to delete category',
                });
            }
            if(!deletedCategory){
                return res.status(200).json({
                    message: 'No category found',
                });
            }
            return res.status(200).json({
                category: deletedCategory,
            });
        }
    );
};
