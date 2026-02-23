import api from "../../services/api";

export const getFrameworks = async()=>{
    const response = await api.get("/frameworks");
    return response.data;
}