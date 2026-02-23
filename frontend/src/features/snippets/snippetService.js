import api from "../../services/api";

export const getSnippets = async(frameworkSlug, categorySlug) =>{
    const response = await api.get(`/frameworks/${frameworkSlug}/${categorySlug}/snippets`);
    return response.data;
}

export const getSnippetDetail = async(
    frameworkSlug,
    categorySlug,
    integrationSlug
) =>{
    const response = await api.get(`/frameworks/${frameworkSlug}/${categorySlug}/${integrationSlug}`);
    return response.data;
}