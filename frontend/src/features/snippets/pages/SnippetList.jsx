import { getSnippets } from "../snippetService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SnippetList(){
    const { slug, categorySlug} = useParams();
    const navigate = useNavigate();

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchSnippets = async() => {
            try{
                const data = await getSnippets(slug, categorySlug);
                setSnippets(data);
            }catch(error){
                console.error("Error fetching snippets:", error);
            }finally{
                setLoading(false);
            }
        }
        fetchSnippets();
    }, [slug, categorySlug]);

    if(loading) return <div className="p-10">Loading...</div>

    return(
        <div className="min-h-screen p-10">
            <h1
                className="text-3xl font-bold mb-6"
            >{categorySlug.toUpperCase()} Snippets</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {snippets.map((snippet)=>(
                    <div
                        className="cursor-pointer p-6 border rounded shadow hover:shadow-lg transition"
                        key={snippet._id}
                        onClick={()=> navigate( `/frameworks/${slug}/${categorySlug}/${snippet.integrationSlug}`)}
                    >
                        <h2 className="text-xl font-semibold">{snippet.title}</h2>
                        <p className="text-sm text-gray-600">{snippet.shortDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}