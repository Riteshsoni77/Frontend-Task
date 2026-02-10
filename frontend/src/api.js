import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend URL
});

// Add an interceptor to include the JWT token in the Authorization header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return req;
});

export default API;