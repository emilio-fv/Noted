import axios from "axios";
import baseUrl from "./baseAPI";

const authAPI = axios.create({
  baseURL: baseUrl + '/auth'
});

export default authAPI;