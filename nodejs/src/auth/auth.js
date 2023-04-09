import createToken from './createJWT'

require('dotenv').config();
const verifyKey = process.env.KEYSECRECT;
const verifyRefreshTokenKey = process.env.REFESHKEYSECRECT
const CheckToken = (req, res, next) => {
    const { tokenOnRequest } = req.header;
    if (!tokenOnRequest) {
        return res.status(400).json("please Login")
    }
    jwt.verify(tokenOnRequest, verifyKey, function (err, tokenAfterVerifyIsCorrect) {
        if (err) { return res.status(400).json('need to login again !') }
        req.user = tokenAfterVerifyIsCorrect;
        next();
    })
};

const checkAuthor = (req, res, next) => { 

}
module.exports = {
    CheckToken,
} 