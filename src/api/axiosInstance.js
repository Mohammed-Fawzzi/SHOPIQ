import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiHeaders = {
  accept: "application/json",
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: apiHeaders,
});

export default api;
