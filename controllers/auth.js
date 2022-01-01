exports.signUp = (req, res) => res.status(200).json(req.body);
exports.signIn = (req, res) => res.status(200).json(req.body);
exports.signOut = (req, res) => res.status(200).json({
    message: 'signOut success',
});
