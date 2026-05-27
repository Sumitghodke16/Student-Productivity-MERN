import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ADD TOKEN AUTOMATICALLY

API.interceptors.request.use(
  (config) => {

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userInfo?.token) {

      config.headers.Authorization =
        `Bearer ${userInfo.token}`;

    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;