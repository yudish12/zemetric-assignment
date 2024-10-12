import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ErrorContext } from "./ErrorContext";
import { SmsContext } from "./SmsContext";

export const useAuthContext = () => useContext(AuthContext);

export const useErrorContext = () => useContext(ErrorContext);

export const useSmsContext = () => useContext(SmsContext);
