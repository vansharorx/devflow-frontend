import {
    createContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

import {
    setAccessToken,
    clearAccessToken
} from "../services/tokenStore";

export const AuthContext =
    createContext();

export const AuthProvider = ({
    children
}) => {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const loadUser = async () => {

        try {

            const res =
                await api.get("/users/me");

            setUser(
                res.data.data
            );

            return true;

        } catch (err) {

            try {

                const refreshResponse =
                    await api.post(
                        "/users/refresh"
                    );

                setAccessToken(
                    refreshResponse.data.accessToken
                );

                const userResponse =
                    await api.get("/users/me");

                setUser(
                    userResponse.data.data
                );

                return true;

            } catch (refreshError) {

                clearAccessToken();
                setUser(null);

                return false;

            }

        }

    };

    useEffect(() => {

        const initializeAuth = async () => {

            await loadUser();

            setLoading(false);

        };

        initializeAuth();

    }, []);

    const logout = async () => {

        try {

            await api.post(
                "/users/logout"
            );

        } catch (err) {

            console.error(
                "Logout failed:",
                err
            );

        } finally {

            clearAccessToken();
            setUser(null);

        }

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loadUser,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};