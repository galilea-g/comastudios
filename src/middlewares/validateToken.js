import jwt from 'jsonwebtoken'
import  { TOKEN_CACHE } from '../config.js';
/**
 * This middleware function ensures that a valid authentication token is present in the request.
 * It checks for the existence of a token in the request cookies and verifies its validity using
 * the provided secret key. 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Continue with the next function/action if token exists
 */

export const authRequired = (req, res, next) => {
    // Extract the token from the request cookies
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: "No authtorization"});
    }

    // Verify the token using the secret key
    jwt.verify(token, TOKEN_CACHE, (err, user) =>{
        if(err){
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = user
        console.log(user)
        
        // Call the next middleware function in the chain
        next()
    })
};