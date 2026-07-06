import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000
});

export const analyzeProduct = (payload) => api.post("/analyze", payload).then((res) => res.data);
export const getReports = () => api.get("/reports").then((res) => res.data);
export const getReport = (id) => api.get(`/report/${id}`).then((res) => res.data);
export const deleteReport = (id) => api.delete(`/report/${id}`).then((res) => res.data);
export const getEcoTips = () => api.get("/ecoTips").then((res) => res.data);
export const getRecyclingGuide = (query) => api.get("/recyclingGuide", { params: { query } }).then((res) => res.data);
