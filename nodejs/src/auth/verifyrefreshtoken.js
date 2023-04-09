const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyRefreshTokenKey = process.env.REFESHKEYSECRECT;

const verifyRefreshToken = (req, res, next) => {
    const refreshTokenFromUserRequest = req.header('Authorization');
    jwt.verify(refreshTokenFromUserRequest, verifyRefreshTokenKey, function (err, refreshTokenAfterVerifyIsCorrect) {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user =  refreshTokenAfterVerifyIsCorrect;
        next();
    });
};


export default verifyRefreshToken


