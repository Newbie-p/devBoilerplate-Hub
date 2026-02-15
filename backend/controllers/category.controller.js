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
        
        const categoryIds = await Snippet.find({framework : framework._id})
            .distinct("category");
        
        const categories = await Category.find({_id : {$in: categoryIds}}).select("name slug");
        
        
        res.status(200).json(categories);
    }catch(error){
        console.log("Error in fetching categories", error);
        res.status(500).json({message: "server error"});
    }
}