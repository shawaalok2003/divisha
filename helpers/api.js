import axios from "axios";
import { API_URLS } from "../constants";
import { consoleLogger } from ".";

const STW_API = axios.create({
    baseURL: `${API_URLS.BASE}`,
    //withCredentials: true
});

STW_API.interceptors.request.use((config) => {
    //consoleLogger(config);
    return config;
});

export default STW_API;
