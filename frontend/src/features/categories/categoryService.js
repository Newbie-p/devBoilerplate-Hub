import api from "../../services/api";

export const getCategoriesByFramework = async(slug)=>{
    const response = await api.get(`/frameworks/${slug}/categories `);
    return response.data;
}