const jwt=require("jsonwebtoken")
const User=require("../models/User")

const protect=async(req,res,next)=>{
    // const token=req.headers.authorization.split(' ')[1];
    let token;

    token=req.cookies.token;

    console.log(token);
    // console.log(process.env.JWT_SECRET)
    if(!token){return res.status(401).send('Authorization denied')}

    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)

        req.user = await User.find({UserID:decoded.UserID}).select("-Password")
        next();
    }
    catch(error)
    {
        return res.status(401).send({message:"Not Authorized,Token failed"})
    }
}

const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.Role)){
            return res.status(403).json({message:`Role ${req.user.Role} is not authorized`})
        }
        next();
    };
}

module.exports={protect,authorize}