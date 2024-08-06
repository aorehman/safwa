import { BACKEND_API } from "./apiConfig";
const axios = require('axios');


export default axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
