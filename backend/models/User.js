import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
}, {timestamps: true});

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);