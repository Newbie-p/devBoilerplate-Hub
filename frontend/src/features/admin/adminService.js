import api from "../../services/api";

export const createFramework = async(data) =>{
    const response = await api.post("/frameworks", data);
    return response.data;
}

export const createCategory = async(data) =>{
    const response = await api.post("/frameworks/categories", data);
    return response.data;
}

export const createSnippet = async(data) =>{
    const response = await api.post("/snippets", data);
    return response.data;
}