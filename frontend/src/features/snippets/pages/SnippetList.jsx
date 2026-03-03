import { getSnippets } from "../snippetService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonCard from "../../../components/SkeletonCard";

export default function SnippetList(){
    const { slug, categorySlug} = useParams();
    const navigate = useNavigate();

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const filteredSnippets = snippets.filter((snippet) => 
        snippet.title.toLowerCase().includes(search.toLowerCase())
    );

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

    if(loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
                {[...Array(3)].map((_, i)=> (
                    <SkeletonCard key={i} />
                ))}
            </div>
        )
    }

    if(!snippets.length){
        return(
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
                <h2 className="text-xl font-semibold mb-2">
                    No snippets available
                </h2>
                <p>Content will appear here once added.</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen p-10">
            <h1
                className="text-3xl font-bold mb-6"
            >{categorySlug.toUpperCase()} Snippets</h1>

            <input 
                type="text"
                placeholder="Search snippets.."
                className="mb-6 p-2 border rounded w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSnippets.map((snippet)=>(
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