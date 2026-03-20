import { useEffect, useState } from "react";
import { getFrameworks } from "../../frameworks/frameworkService";
import { createCategory } from "../adminService";
import { useNavigate } from "react-router-dom";

export default function CreateCategory(){
    const [frameworks, setFrameworks] = useState([]);
    const [frameworkId, setFrameworkId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchFrameworks = async() =>{
            try{
                const data = await getFrameworks();
                setFrameworks(data);
            }catch(error){
                console.error("Error fetching frameworks:", error);
            }
        };
        fetchFrameworks();
    }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await createCategory({name, frameworkId});
            setMessage("category created successfully");

            setTimeout(()=>{
                navigate("/");
            }, 1000);
        }catch(error){
            console.error("Create category error:", error);
        }
    };

    return(
        <div className="max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Create Category</h1>
            {message && (
                <p className="mb-4 text-green-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    className="border p-2 rounded"
                    value={frameworkId}
                    onChange={(e)=> setFrameworkId(e.target.value)}
                    required
                >
                    <option value="">Select Framework</option>

                    {frameworks.map((fw) => (
                        <option key={fw._id} value={fw._id}>
                            {fw.name}
                        </option>
                    ))}
                </select>

                <input 
                    type="text"
                    placeholder="Category name (e.g. Authentication)"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    required
                />

                <button className="bg-black text-white py-2 rounded">
                    Create Category
                </button>
            </form>
        </div>
    )
}