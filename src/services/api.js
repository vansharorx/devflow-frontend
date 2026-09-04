import axios from "axios";

import {
    getAccessToken,
    setAccessToken,
    clearAccessToken
} from "./tokenStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {

    const token = getAccessToken();

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
            !originalRequest._retry &&
            !originalRequest.url?.includes("/users/refresh")
        ) {

            originalRequest._retry = true;

            try {

                const res =
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/users/refresh`,
                        {},
                        {
                            withCredentials: true
                        }
                    );

                const newAccessToken =
                    res.data.accessToken;

                setAccessToken(
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {

                clearAccessToken();

                window.location.href =
                    "/login";

                return Promise.reject(err);

            }

        }

        return Promise.reject(error);

    }

);

export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append(
        "profileImage",
        file
    );

    const response =
        await api.post(
            "/users/profile-image",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );

    return response.data;
};

export default api;