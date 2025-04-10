import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "https://api.sand-box.pp.ua/",
});

export default api;