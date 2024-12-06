const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization ;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
       return res.status(401).json({message:"No token, Authorization denied"});
        }

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRETE);
            req.user = decode;
            console.log("The decoded user is :",req.user);
            next();
        } catch (error) {
            res.status(400).json({message:"Token is not valid"});
        }
    }else{
        return res.status(401).json({message:"No token, Authorization denied"});
    }
}

module.exports = verifyToken;