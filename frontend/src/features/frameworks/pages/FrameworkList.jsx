import { useEffect, useState } from "react";
import { getFrameworks } from "../frameworkService";
import { useNavigate } from "react-router-dom";

export default function FrameworkList(){
    const [frameworks, setFrameworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const data = await getFrameworks();
                console.log("Frameworks API response:", data);
                setFrameworks(data);
            }catch(error){
                console.error("Error fetching framewoks:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) return <div className="p-10">Loading...</div>;

    return(
        <div className="min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-6">Frameworks</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {frameworks.map((framework) =>(
                    <div
                        key={framework._id}
                        onClick={()=> navigate(`/frameworks/${framework.slug}`)}
                        className="cursor-pointer p-6 border rounded shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold">{framework.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}