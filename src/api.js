import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ,
});
console.log(import.meta.env.VITE_API_BASE);

export default API;
