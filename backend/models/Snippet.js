import mongoose from "mongoose";
import slugify from "slugify";

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    integrationSlug: {
        type: String,
        unique: true,
    },

    framework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Framework",
        required: true,
    },

    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },

    installCommand: String,

    code: {
      type: String,
      required: true,
    },

    explanation: String,

    documentationUrl: String,

    tags: [String],

}, {timestamps: true});

snippetSchema.pre("save", function(){
    if(!this.integrationSlug){
        this.integrationSlug = slugify(this.title, {
            lower: true,
            strict: true,
        });
    }
});

export default mongoose.model("Snippet", snippetSchema);