import axios from "axios";

const reviewAPI = axios.create({
  baseURL: 'http://localhost:8000/review'
});

export default reviewAPI;