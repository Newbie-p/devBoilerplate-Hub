import { useEffect, useState } from "react";
import { getFrameworks } from "../../frameworks/frameworkService";
import { createSnippet } from "../adminService";
import { useParams } from "react-router-dom";
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

    const { id } = useParams();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (!isEditMode) return;

        const fetchSnippet = async () => {
            try {
            const res = await api.get(`/snippets/id/${id}`);
            const data = res.data;

            setForm({
                frameworkId: data.framework,
                categoryId: data.category,
                title: data.title,
                shortDescription: data.shortDescription,
                installCommand: data.installCommand || "",
                code: data.code,
                explanation: data.explanation || "",
                documentationUrl: data.documentationUrl || "",
                tags: data.tags.join(", "),
            });

            } catch (error) {
            console.error("Error loading snippet:", error);
            }
        };

        fetchSnippet();
    }, [id]);

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
        if( isEditMode){
            await api.put(`/snippets/${id}`, {
                ...form,
                tags: form.tags.split(",").map(tag => tag.trim())
            })
            alert( "Snippet updated successfully");
        }
        else{
            try{
                await createSnippet({
                    ...form,
                    tags: form.tags.split(",").map(tage => tage.trim()),
                });
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
                alert("Snippet created successfully");
            }catch(error){
                alert(error.response?.data?.message || "Something went wrong");
            }
        }
        
    };

    return(
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Create Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Framework */}
                <select name="frameworkId" value={form.frameworkId} onChange={handleChange} required>
                <option value="">Select Framework</option>
                {frameworks.map(f => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                ))}
                </select>

                {/* Category */}
                <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
                </select>

                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                <input name="shortDescription" placeholder="Short Description" value={form.shortDescription} onChange={handleChange} />

                <input name="installCommand" placeholder="Install Command" value={form.installCommand} onChange={handleChange} />

                <textarea name="code" placeholder="Code" value={form.code} onChange={handleChange} required />

                <textarea name="explanation" placeholder="Explanation" value={form.explanation} onChange={handleChange} />

                <input name="documentationUrl" placeholder="Docs URL" value={form.documentationUrl} onChange={handleChange} />

                <input name="tags" placeholder="tags (comma separated)" value={form.tags} onChange={handleChange} />

                <button className="bg-black text-white py-2 rounded">
                    {isEditMode ? "Update Snippet" : "Create Snippet"}
                </button>

            </form>
        </div>
    )
}