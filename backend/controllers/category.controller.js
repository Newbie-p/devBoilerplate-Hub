import Snippet from "../models/Snippet.js";
import Framework from "../models/Framework.js";
import Category from "../models/Category.js";

export const getCategoriesByFramework = async(req, res)=>{
    try{
        const { frameworkSlug } = req.params;
        const framework = await Framework.findOne({slug : frameworkSlug});

        if(!framework){
            return res.status(404).json({message : "Framework not found"});
        }
        
        const categories = await Category.find({
            framework: framework._id,
        }).select("name slug");     
        res.status(200).json(categories);
    }catch(error){
        console.log("Error in fetching categories", error);
        res.status(500).json({message: "server error"});
    }
}

export const createCategory = async(req,res)=>{
    try{
        const { name , frameworkId} = req.body;

        if(!name || ! frameworkId){
            return res.status(400).json({
                message: " Name and framework are required"
            })
        }

        const category = await Category.create({
            name,
            framework: frameworkId,
        });
        res.status(201).json(category);
    }catch(error){
        console.error("create category error:", error);
        res.status(500).json({message: "Server error"});
    }
};