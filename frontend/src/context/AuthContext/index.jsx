import React, { useState, useEffect, useCallback } from "react";
import { localStorageGet, localStorageSet } from "../../utils/localstorage.js";
import { getUserApi, loginApi, signupApi } from "./api.js";
import { isPhonenumber, isPassword } from "../../utils/validators.js";
import { toast } from "react-toastify";
import { useErrorContext } from "../hooks.jsx";

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setErrorFunc } = useErrorContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorageGet("user");

  const getUser = useCallback(async () => {
    const resp = await getUserApi(token);
    if (!resp.success) {
      setErrorFunc(resp);
      return;
    }
    setUser(resp.data.data);
    setIsAuthenticated(true);
    setLoading(false);
  }, [token]);

  // Signup Function
  const signupFunc = async (phoneNumber, password, name) => {
    if (!isPhonenumber(phoneNumber)) {
      setErrorFunc({
        error: "Please enter a valid phone number",
        field: "phoneNumber",
      });
      return;
    }
    if (!isPassword(password)) {
      setErrorFunc({
        error: "Password must be at least 8 characters long",
        field: "password",
      });
      return;
    }
    if (!name) {
      setErrorFunc({
        error: "Please enter first name",
        field: "name",
      });
      return;
    }
    const resp = await signupApi(phoneNumber, password, name);
    if (!resp.success) {
      setErrorFunc(resp);
      return;
    }
    console.log(resp.data);
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
    toast.success("Signup successful");
  };

  // Login Function
  const loginFunc = async (phoneNumber, password) => {
    console.log(phoneNumber, password);
    if (!isPhonenumber(phoneNumber)) {
      setErrorFunc({
        error: "Please enter valid phonenumber",
        field: "phoneNumber",
      });
      return;
    }
    if (!isPassword(password)) {
      setErrorFunc({
        error: "Please enter valid password",
        field: "password",
      });
      return;
    }
    const resp = await loginApi(phoneNumber, password);
    if (!resp.success) {
      return;
    }
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
    toast.success("Logged in successfully");
  };

  // Logout Function
  const logoutFunc = () => {
    localStorageSet("user", null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginFunc,
        logoutFunc,
        signupFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
