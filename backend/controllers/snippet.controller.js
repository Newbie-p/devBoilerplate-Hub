import Snippet from "../models/Snippet.js";
import Framework from "../models/Framework.js";
import Category from "../models/Category.js";

export const getSnippetByFrameworkAndCategory = async(req, res)=>{
    try{
        const {frameworkSlug, categorySlug} = req.params;

        const framework = await Framework.findOne({slug: frameworkSlug});
        if(!framework){
            return res.status(404).json({message : "framework not found"});
        }

        const category = await Category.findOne({slug: categorySlug});
        if(!category){
            return res.status(404).json({message: "category not found"});
        }

        const snippets = await Snippet.find({
            framework: framework._id,
            category: category._id,
        }).select("title integrationSlug shortDescription");
        res.status(200).json(snippets);
    }catch(error){
        console.error("Error fetching snippets: ", error);
        res.status(500).json({message: "server error"});
    }
}