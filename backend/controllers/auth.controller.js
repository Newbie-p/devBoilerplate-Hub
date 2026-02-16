import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (user) =>{
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    );
};

export const registerUser = async(req, res)=>{
    try{
        const { name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({name, email, password});
        const token = generateToken(user);

        res.status(200).json({
            message: "User registered successfully",
            token,
        });
    }catch(error){
        console.error("Register error: ", error);
        res.status(500).json({message: "server error"});
    }
};

export const loginUser = async(req, res)=>{
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful",
            token,
        })
    }catch(error){
        console.error("Login error: ", error);
        res.status(500).json({ message : "server error"});
    }
};