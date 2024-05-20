import axios from "axios";
import Cookies from "js-cookie";

// const API_BASE_URL = "https://cinebook24180.onrender.com";
const API_BASE_URL = "http://localhost:9000";

const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const initializeAxiosInterceptors = () => {
  const token = Cookies.get("token");
  if (token) {
    setupAxiosInterceptors(token);
  }
};

export const getDataAPI = async (url) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(`${API_BASE_URL}/${url}`, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const postDataAPI = async (url, post) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(`${API_BASE_URL}/${url}`, post, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const putDataAPI = async (url, post) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.put(`${API_BASE_URL}/${url}`, post, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const patchDataAPI = async (url, post) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.patch(`${API_BASE_URL}/${url}`, post, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const deleteDataAPI = async (url) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(`${API_BASE_URL}/${url}`, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error("Error fetching data:", error);
  if (error.response && error.response.status === 401) {
    Cookies.remove("currentUser");
    Cookies.remove("token");
    window.location.href = "/login";
  }
  throw error;
};
