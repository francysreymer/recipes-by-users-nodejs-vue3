import axios from "axios";
import Cookies from "js-cookie";
import baseUrlApi from "@/config/baseUrlApi";

const instance = axios.create({
  baseURL: baseUrlApi,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
