const jwt = require('jsonwebtoken');
require('dotenv').config();


const refreshToken = (userid,roleid) =>{
    const payload = {
        userid , 
        roleid };
    const Secrectkey = process.env.REFESHKEYSECRECT || 'kiaconkynhong';
    const option = {
        expiresIn : Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
    }
    const refeshToken =jwt.sign({payload,option}, Secrectkey);
    return refeshToken
    
    
}
export default refreshToken
