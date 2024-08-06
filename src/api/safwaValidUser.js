import axios from "axios";
import { BACKEND_API } from "./apiConfig";

const safwaValidUser = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
safwaValidUser.interceptors.request.use(
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

export default safwaValidUser;
