/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useErrorContext } from "../../context/hooks";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  const { error, clearError } = useErrorContext();
  console.log(error);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        autoComplete="off"
        onChange={handleChange}
        className="form-input text-black"
      />
      {error?.field === name && (
        <span className="text-red-500">{error.error}</span>
      )}
    </div>
  );
};

export default FormRow;
