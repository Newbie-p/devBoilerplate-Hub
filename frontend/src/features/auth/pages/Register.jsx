import { useState } from "react";
import { registerUser } from "../authService";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            const data = await registerUser(form);
            setMessage(data.message);
            setTimeout(()=> navigate("/login"), 2000);
        }catch(err){
            setError(err.response?.data?.message || "Registration Failed");
        }
    };

    return(
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80"
            >
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full mb-3 p-2 border"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border"
                    onChange={handleChange}
                    required
                />

                <button type="submit"
                    className="w-full bg-black text-white p-2"
                >Register</button>
            </form>
        </div>
    );
}