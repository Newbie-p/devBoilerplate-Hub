import Snippet from "../models/Snippet.js";
import Framework from "../models/Framework.js";
import Category from "../models/Category.js";

export const createSnippet = async (req, res)=>{
    try{
        const{
            title,
            frameworkSlug,
            categorySlug,
            shortDescription,
            installCommand,
            code,
            explanation,
            documentationUrl,
            tags,
        } = req.body;

        const framework = await Framework.findOne({slug: frameworkSlug});
        if(!framework){
            return res.status(404).json({message: "Framework not found"});
        }

        const category = await Category.findOne({ slug: categorySlug});
        if(!category){
            return res.status(404).json({message : "Category not found"});
        }

        const snippet = await Snippet.create({
            title,
            framework: framework._id,
            category: category._id,
            shortDescription,
            installCommand,
            code,
            explanation,
            documentationUrl,
            tags,
        });

        res.status(201).json({
            message: "Snippet created successfully",
            snippet,
        });
    }catch(error){
        console.error("Create snippet error: ", error);
        res.status(500).json({message: "Server error"});
    }
};

export const updateSnippet = async(req, res)=>{
    try{
        const { id } = req.params;

        const updatedSnippet = await Snippet.findByIdAndUpdate(
            id, 
            req.body,
            {new: true},
        )

        if(!updatedSnippet){
            return res.status(404).json({message: "Snippet not found"});
        }

        res.status(200).json({
            message: "Snippet updated successfully",
            updatedSnippet,
        });
    }catch(error){
        console.error("Update snippet error: ", error);
        res.status(500).json({message: "Server error"});
    }
};

export const deleteSnippet = async(req, res)=>{
    try{
        const {id} = req.params;

        const deletedSnippet = await Snippet.findByIdAndDelete(id);

        if(!deletedSnippet){
            return res.status(404).json({message: "Snippet not found"});
        }

        res.status(200).json({
            message: "Snippet deleted successfully",
            deletedSnippet,
        });
    }catch(error){
        console.error("Delete snippet error: ", error);
        res.status(500).json({message: "Server error"});
    }
};