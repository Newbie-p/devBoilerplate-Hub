import Framework from "../models/Framework.js";
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