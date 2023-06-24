import axios from "axios";
import baseUrl from "./baseAPI";

const reviewAPI = axios.create({
  baseURL: baseUrl + '/review'
});

export default reviewAPI;