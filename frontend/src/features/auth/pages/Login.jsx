import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authService";
import { useAuth } from "../authContext";

export default function Login(){
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        try{
            const data = await loginUser(form);
            login(data.token);
            navigate("/dashboard");
        }catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return(
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border"
                    onChange={handleChange}
                    required 
                />
                <input type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border"
                    onChange={handleChange}
                    required 
                />
                <button type="submit" className="w-full bg-black text-white p-2">Login</button>
            </form>
        </div>
    )
}