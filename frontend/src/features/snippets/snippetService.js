import api from "../../services/api";

export const getSnippets = async(frameworkSlug, categorySlug) =>{
    const response = await api.get(`/snippets/${frameworkSlug}/${categorySlug}/snippets`);
    return response.data;
}

export const getSnippetDetail = async(
    frameworkSlug,
    categorySlug,
    integrationSlug
) =>{
    const response = await api.get(`/snippets/${frameworkSlug}/${categorySlug}/${integrationSlug}`);
    return response.data;
}

export const deleteSnippet = async(id) =>{
    const res = await api.delete(`/snippets/${id}`);
    return res.data;
}