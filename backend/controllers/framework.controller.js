import Framework from "../models/Framework.js";
import slugify from "slugify";
export const getAllFrameworks = async(req, res)=>{
    try{
        const frameworks = await Framework.find()
            .select("name slug")
            .sort({createdAt : 1});
        res.status(200).json(frameworks);
    }catch(error){
        console.log("Error in fetching frameworks: ", error);
        res.status(500).json({message : "server error"});
    }
};

export const createFramework = async(req, res)=>{
    try {
        const { name } = req.body;

        if (!name) {
        return res.status(400).json({ message: "Framework name is required" });
        }

        const slug = slugify(name, { lower: true, strict: true });

        // prevent duplicates
        const exists = await Framework.findOne({ slug });
        if (exists) {
        return res.status(409).json({ message: "Framework already exists" });
        }

        const framework = await Framework.create({ name, slug });

        res.status(201).json(framework);
    } catch (error) {
        console.error("Create framework error:", error);
        res.status(500).json({ message: "Server error" });
    }
}