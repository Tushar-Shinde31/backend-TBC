// Axios instance for making API requests to the backend

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API base URL
  withCredentials: true // Send cookies with requests
});

export default api;
