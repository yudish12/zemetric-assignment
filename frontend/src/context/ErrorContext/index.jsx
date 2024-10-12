/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast } from "react-toastify";

export const ErrorContext = React.createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const setErrorFunc = (errorObj) => {
    const { error, field } = errorObj;
    if (field === "toast") {
      toast.error(error);
    } else {
      setError({ error, field });
    }
  };

  return (
    <ErrorContext.Provider value={{ error, clearError, setErrorFunc }}>
      {children}
    </ErrorContext.Provider>
  );
};
