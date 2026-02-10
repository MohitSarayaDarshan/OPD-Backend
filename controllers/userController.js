const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupUser = async (req, res) => {
    try {
        const newUser = await User(req.body);

        const savedUser = await newUser.save();

        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { Email, Password, Role } = req.body;

    const user = await User.find({ Email: Email, Role:Role });
    console.log(user);
    if (user && user.length>0) {
        const match = await bcrypt.compare(Password, user[0].Password);

        if (match) {
            const token = await jwt.sign(
                { UserID: user[0].UserID },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
            );

            res.cookie("token", token, {
                httpOnly: true, // Prevents XSS attacks
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                sameSite: "strict", // Prevents CSRF attacks
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.status(201).json({ message: "Login Successful", data: user });
        }
        else
        {
            // console.log("invalid email or password")
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token')
    return res.status(201).json({ message: "Logged out successfully" });
};

const handleMe=async(req,res)=>{
    const token=req.cookies.token
    console.log(token);
    if(!token)
    {
        return res.status(401).json({
            authenticated:false,
            message:"No session found"
        })
    }

     try{
            const decoded=await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded)
    
            const user = await User.find({UserID:decoded.UserID}).select("-Password")
    
            console.log(user)
            if(!user){
                return res.status(404).json({message:"User no longer exists"})
            }
    
            return res.status(200).json({
                authenticated:true,
                data:user
            })
        }
        catch(error)
        {
            return res.status(403).json({ 
            authenticated: false, 
            message: "Session expired or invalid" 
                });
            }
}

module.exports = { signupUser, loginUser, logoutUser,handleMe };
