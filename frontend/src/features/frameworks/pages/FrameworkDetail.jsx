import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoriesByFramework } from "../../categories/categoryService";
import SkeletonCard from "../../../components/SkeletonCard";

export default function FrameworkDetail(){
    const { slug } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchCategories = async() =>{
            try{
                const data = await getCategoriesByFramework(slug);
                setCategories(data);
            }catch(error){
                console.error("Error fetching categories:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchCategories();
    }, [slug]);

    if(loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
                {[...Array(3)].map((_, i)=> (
                    <SkeletonCard key={i} />
                ))}
            </div>
        )
    }
    if(!categories.length){
        return(
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
                <h2 className="text-xl font-semibold mb-2">
                    No categories available yet.
                </h2>
                <p>Content will appear here once added.</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-6">
                {slug.toUpperCase()} Categories
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category)=>(
                    <div
                        key={categories._id}
                        onClick={()=> navigate(`/frameworks/${slug}/${category.slug}`)}
                        className="cursor-pointer p-6 border rounded shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}