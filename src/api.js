import axios from "axios";

console.log("API URL:", import.meta.env.VITE_BLOG_POST_API);

const api = axios.create({
    baseURL: import.meta.env.VITE_BLOG_POST_API,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;