import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercasr: true,
    },

    password:{
        type: String,
        required: true,
        minlength: 6,
    },

    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    provider:{
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    isVerified:{
        type: Boolean,
        default: false,
    },

    emailVerifiactionToken: String,
    emailVerifiactionExpire: Date,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {timestamps: true});

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateEmailVerificationToken = function(){
    const verificationToken = crypto.randomBytes(32).toString("hex");

    this.emailVerifiactionToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");
    
    this.emailVerifiactionExpire = Date.now() + 24*60*60*1000; //24hrs

    return verificationToken;
}

userSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    this.resetPasswordExpire = Date.now() + 15*60*1000; // 15mins

    return resetToken;
}

export default mongoose.model("User", userSchema);