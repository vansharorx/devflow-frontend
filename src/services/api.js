import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }

  return config;

});

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        const res =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/users/refresh`,

            {
              token: refreshToken
            }

          );

        const newAccessToken =
          res.data.accessToken;

        localStorage.setItem(
          "token",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        window.location.href =
          "/login";

        return Promise.reject(err);

      }

    }

    return Promise.reject(error);

  }

);

export default api;