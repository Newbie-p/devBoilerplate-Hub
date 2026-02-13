import mongoose, { mongo, Types } from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug:{
        type: String,
        unique: true,
    },

    description:{
        type: String,
    },
}, {timestamps: true});

categorySchema.pre("save", function(){
    if(!this.slug){
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }
});

export default mongoose.model("Category", categorySchema);