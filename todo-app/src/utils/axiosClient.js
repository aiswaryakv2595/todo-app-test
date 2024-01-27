import axios from "axios";
import querySting from "query-string";
import {base_url} from "./baseUrl";

const axiosClient = axios.create({
  baseURL: base_url,
  paramsSerializer: (params) => querySting.stringify({ params }),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    if (!error.response) {
      return alert(error);
    }
    throw error.response;
  }
);

export default axiosClient;