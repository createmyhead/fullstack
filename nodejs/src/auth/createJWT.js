const jwt = require('jsonwebtoken');
require('dotenv').config();


const createToken = (userid,roleid) =>{
    const payload = {
        userid , 
        roleid };
    const Secrectkey = process.env.KEYSECRECT || 'kiaconbuomxanh';
    const option = {
        expiresIn : Math.floor(Date.now() / 1000) + (60 * 60)
    }
    const newtoken =jwt.sign({payload,option}, Secrectkey);
    return newtoken
    
    
}
export default createToken
