import axios from "axios";
import { BACKEND_API } from "./apiConfig";

const safwaValidUserForFile = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
safwaValidUserForFile.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("safwaToken");
    if (token) {
      const user = JSON.parse(token);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default safwaValidUserForFile;
