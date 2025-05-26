const jwt = require("jsonwebtoken");
const authMiddleware = async(req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: "Unauthorized HTTP, Token not provied"});
    }
    
    // Bearer htane ke lie
    const jwtToken = token.replace("Bearer", "").trim();
    console.log('token from auth middleware', jwtToken);

    try{
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const userData = await User.findOne({email: isVerified.email});
        console.log(isVerified);
        next();
    }
    catch(error){
        return res.status(401).json({ message : "Unauthorized, Invalid Token!"});
    }
};

module.exports = authMiddleware;