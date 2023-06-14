import axios from "axios";

const authAPI = axios.create({
  baseURL: 'http://localhost:8000/auth'
});

export default authAPI;