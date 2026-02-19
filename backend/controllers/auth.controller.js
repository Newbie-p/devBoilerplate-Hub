import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

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

        const verificationToken = user.generateEmailVerificationToken();
        await user.save();
        
        // build verification url
        const verificationUrl = `${req.protocol}://${req.get(
            "host"
        )}/api/auth/verify-email/${verificationToken}`;

        //send email
        await sendEmail({
            to: user.email,
            subject: "verify your email",
            html: `
                <h2> Email Verification </h2>
                <p>Thank you for registering. </p>
                <p>Please click the link below to verify your email:</p>
                <a href = "${verificationUrl}">${verificationUrl}</a>
                <p>This link will expire in 24hours.</p>
            `,
        });

        res.status(201).json({
            message: "Registration successful. Please check your email to verify your account.",
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

        if(!user.isVerified){
            return res.status(401).json({
                message: "Please verify your email before logging in",
            });
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

export const verifyEmail = async(req, res)=>{
    try{
        const { token } = req.params;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            emailVerifiactionToken: hashedToken,
            emailVerifiactionExpire: {$gt: Date.now() },
        })

        if(!user){
            return res.status(400).json({message: "Invalid or expired token"});
        }

        user.isVerified = true;
        user.emailVerifiactionToken = undefined;
        user.emailVerifiactionExpire = undefined;

        await user.save();
        res.status(200).json({
            message: "Email verified successfully. You can now login.",
        });
    }catch(error){
        console.error("verify email error: ", error);
        res.status(500).json({message: "Server error"});
    }
}