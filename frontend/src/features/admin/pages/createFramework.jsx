import { useState } from "react";
import { createFramework } from "../adminService";
import { useNavigate } from "react-router-dom";

export default function CreateFramework(){
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("from submitted")
        try{
            await createFramework({ name });
            setMessage("Framework created successfully");
            setTimeout(()=>{
                navigate("/");
            }, 1000);
        }catch(error){
            console.error("Create framework error: ", error);
        }
    };

    return(
        <div className="max-w-xl">
            <h1 className="text-2xl font-bold mb-6"> Create Framework</h1>

            {message && (
                <p className="mb-4 text-green-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Framework name (e.g. Node.js)"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    required
                />

                <button className="bg-black text-white py-2 rounded" type="submit">
                    Create Framework
                </button>
            </form>
        </div>
    )
}