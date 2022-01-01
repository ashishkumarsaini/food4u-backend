/* eslint-disable consistent-return */
exports.getUserById = (req, res, next, id) => {
    if (id !== 'a1000') {
        return res.status(400).json({
            message: 'Unable to find user',
        });
    }
    req.profile = {
        firstName: 'Ashish',
        lastName: 'Saini',
        mobile: '1000000000',
        email: 'mashish2608@gmail.com',
        password: 'Test@123',
    };
    next();
};
exports.getUser = (req, res) => res.status(200).json(req.profile);
exports.updateUser = (req, res) => {
    const initialUser = req.profile;
    const updatedUser = req.body;

    return res.status(200).json({
        initialUser,
        updatedUser,
    });
};
exports.purchasedOrderList = (req, res) => res.status(200).json({
    ...req.profile,
    purchaseList: [
        { name: 'Order1' },
        { name: 'Order2' },
        { name: 'Order3' },
    ],
});
