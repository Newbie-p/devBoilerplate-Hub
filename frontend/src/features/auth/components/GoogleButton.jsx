import { useEffect, useRef } from "react";
import { useAuth } from "../authContext";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function GoogleButton(){
    const googleButtonRef = useRef(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: async(response) =>{
                try{
                    console.log("Google ID Token:", response.credential);
                    const res = await api.post("/auth/google-login", {
                        idToken: response.credential,
                    });
                    console.log("Backend response:", res.data);
                    login(res.data.token);
                    navigate("/dashboard");
                }catch(error){
                    console.error("Google login failed", error.response?.data || error);
                }
            }
        });

        window.google.accounts.id.renderButton(
            googleButtonRef.current,{
                theme: "outline",
                size: "large",
            }
        );
    }, []);



    return <div ref={googleButtonRef}></div>;
}