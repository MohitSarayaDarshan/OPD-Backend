const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupUser = async (req, res) => {
    try {
        const newUser = await User(req.body);

        const savedUser = await newUser.save();

        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    const user = await User.find({ Email: Email });
    console.log(user);
    if (user) {
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

            res.status(200).json({ message: "Login Successful", data: user });
        }
        else
        {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signupUser, loginUser, logoutUser };
