// context/AuthContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null); // Store email temporarily for OTP
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("auth_user");
        if (stored) {
          const userData = JSON.parse(stored);
          setUser(userData);
        }
      } catch (error) {
        console.error("AuthContext - Error loading user:", error);
        localStorage.removeItem("auth_user");
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Save user to state and localStorage
  const saveUser = (data) => {
    console.log("AuthContext - Saving user:", data);
    setUser(data);
    localStorage.setItem("auth_user", JSON.stringify(data));
  };

  // Signup handler (stores email in pendingUser if successful)
  const signup = async ({ name, email, password, password_confirmation, terms_and_conditions }) => {
    const res = await axiosInstance.post("/user-signup", {
      name,
      email,
      password,
      password_confirmation,
      terms_and_conditions,
    });

    // If registration is accepted, store email for OTP verification
    if (res.data?.status === true || res.data?.code === 202) {
      setPendingUser({ email });
    }

    return res.data;
  };

  // OTP verification handler
  const verifyOtp = async ({ email, otp }) => {
    const res = await axiosInstance.post("/verify/email/otp", {
      email,
      otp,
    });

    // On success, store user and token
    if (res.data?.status) {
      const data = {
        ...res.data.data.user,
        token: res.data.data.token,
      };
      saveUser(data);
      setPendingUser(null); // clear pending user
    }

    return res.data;
  };

  // Login handler
  const login = async ({ email, password }) => {
    const res = await axiosInstance.post("/user-login", { email, password });

    if (res.data?.status) {
      saveUser(res.data.data);
    }

    return res.data;
  };

  // Logout handler
  const logout = async () => {
    try {
      const authUser = localStorage.getItem("auth_user");
      const token = authUser ? JSON.parse(authUser).token : null;
      
      if (token) {
        await axiosInstance.post("/user-logout", {}, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      } else {
        await axiosInstance.post("/user-logout");
      }
    } catch (err) {
      console.warn("Logout failed:", err);
    }

    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingUser,
        isLoading,
        signup,
        verifyOtp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access auth context
export const useAuth = () => useContext(AuthContext);
