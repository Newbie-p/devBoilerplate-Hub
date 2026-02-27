import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { Children } from "react";

export default function PublicRoute(){
    const { use, loading} = useAuth();

    if(loading) return null;

    if(user){
        return <Navigate to="/" replace />
    }

    return Children;
}