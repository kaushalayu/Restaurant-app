require('dotenv').config();
const jwt = require("jsonwebtoken");
const createHttpError = require('http-errors');


const isVerify = async(req,res,next)=>{
    try
    {
        const {accessToken} = req.cookies;

        if(!accessToken)
        {
            const error = createHttpError(401,"Please provide Token");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken,process.env.JWT_TOKEN);
        
        const user = await User.findById(decodeToken._id);
        if(!user)
        {
            const error = createHttpError(401,"User not exist");
            return next(error);
        }
        req.user = user;
        next();
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {isVerify};
