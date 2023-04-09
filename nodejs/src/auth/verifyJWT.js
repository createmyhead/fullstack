const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyKey = process.env.KEYSECRECT;

const verifyToken = (req, res, next) => {
    const tokenFromUserRequest = req.header('Authorization');
    jwt.verify(tokenFromUserRequest, verifyKey, function (err, tokenAfterVerifyIsCorrect) {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = tokenAfterVerifyIsCorrect;
        next();
    });
};


export default verifyToken()


