import mongoose from "mongoose";
import slugify from "slugify";

const frameworkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
        },

        description: {
            type: String,
        },
    },
    {timestamps: true}
);

frameworkSchema.pre("save", function (){
    if(!this.slug){
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }
});

export default mongoose.model("Framework", frameworkSchema);