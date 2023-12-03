import axios from "axios";

const getAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    timeout: 1000,
});

getAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { getAPI }