import { useCallback, useEffect, useState } from "react";
import { loginUser } from "../auth/api/loginUser";
import { logoutUser } from "../auth/api/logoutUser";
import { refreshToken as apiRefresh } from "../auth/api/refreshToken";
import { validateUserToken as apiValidate } from "../auth/api/validateUserToken";
import { registerUser } from "../auth/api/registerUser";

export function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateTokenAndSetUser() {
      if (token) {
        try {
          const res = await apiValidate(token);
          setUser(res.user);
        } catch (err) {
          console.error("Token invalid", err);
          setToken(null);
          localStorage.removeItem("accessToken");
        }
      }
      setLoading(false);
    }
    validateTokenAndSetUser();
  }, [token]);

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setToken(data.accessToken);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  }, []);

  const register = useCallback(async (newUser) => {
    await registerUser(newUser);
  }, []);

  const refresh = useCallback(
    async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const data = await apiRefresh(refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        setToken(data.accessToken);
      } catch (err) {
        console.error("Refresh failed", err);
        logout();
      }
    },
    [logout]
  );

  return { user, token, loading, login, logout, register, refresh };
}
