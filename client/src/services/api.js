import axios from "axios";

const API = axios.create({
  baseURL: "https://student-productivity-mern.onrender.com/api",
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