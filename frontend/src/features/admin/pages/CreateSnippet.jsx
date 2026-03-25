import { useEffect, useState } from "react";
import { getFrameworks } from "../../frameworks/frameworkService";
import { createSnippet } from "../adminService";
import api from "../../../services/api";

export default function CreateSnippet(){
    const [frameworks, setFrameworks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        frameworkId: "",
        categoryId: "",
        title: "",
        shortDescription: "",
        installCommand: "",
        code: "",
        explanation: "",
        documentationUrl: "",
        tags: "",
    })

    useEffect(()=>{
        getFrameworks().then(setFrameworks);
    }, []);

    useEffect(()=>{
        if(!form.frameworkId) return;
        const fetchCategories = async() =>{
            try{
                const res = await api.get(
                    `/frameworks/categories/by-framework?frameworkId=${form.frameworkId}`
                );
                setCategories(res.data);
            }catch(error){
                console.error("Error fetching categories: ", error);
            }
        };

        fetchCategories();
    }, [form.frameworkId]);

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await createSnippet({
                ...form,
                tags: form.tags.split(",").map(tage => tage.trim()),
            });
            alert("Snippet created successfully");
            setForm({
                frameworkId: "",
                categoryId: "",
                title: "",
                shortDescription: "",
                installCommand: "",
                code: "",
                explanation: "",
                documentationUrl: "",
                tags: "",
            })
            setCategories([]);
        }catch(error){
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return(
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Create Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Framework */}
                <select name="frameworkId" onChange={handleChange} required>
                <option value="">Select Framework</option>
                {frameworks.map(f => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                ))}
                </select>

                {/* Category */}
                <select name="categoryId" onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
                </select>

                <input name="title" placeholder="Title" onChange={handleChange} required />
                <input name="shortDescription" placeholder="Short Description" onChange={handleChange} />

                <input name="installCommand" placeholder="Install Command" onChange={handleChange} />

                <textarea name="code" placeholder="Code" onChange={handleChange} required />

                <textarea name="explanation" placeholder="Explanation" onChange={handleChange} />

                <input name="documentationUrl" placeholder="Docs URL" onChange={handleChange} />

                <input name="tags" placeholder="tags (comma separated)" onChange={handleChange} />

                <button className="bg-black text-white py-2 rounded">
                Create Snippet
                </button>

            </form>
        </div>
    )
}