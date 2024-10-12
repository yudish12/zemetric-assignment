import React, { useState, useEffect, useCallback } from "react";
import { localStorageGet } from "../../utils/localstorage.js";
import { getSmsLogsApi, getSmsStatsApi, getSmsViolationsApi } from "./api.js";
import { useAuthContext } from "../hooks.jsx";
export const SmsContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const SmsProvider = ({ children }) => {
  const [smsViolations, setSmsViolations] = useState([]);
  const [smsStats, setSmsStats] = useState(null);
  const [smsLogs, setSmsLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthContext();
  const token = localStorageGet("user");

  const getSmsViolations = useCallback(async () => {
    const resp = await getSmsViolationsApi(token);
    if (!resp.success) {
      setLoading(false);
      return;
    }
    setSmsViolations(resp.data.rateLimitViolations);
    setLoading(false);
  }, [token]);

  const getSmsStats = useCallback(async () => {
    const resp = await getSmsStatsApi(token);
    if (!resp.success) {
      setLoading(false);
      return;
    }
    setSmsStats(resp.data);
    setLoading(false);
  }, [token]);

  const getSmsLogs = useCallback(async () => {
    const resp = await getSmsLogsApi(token);
    if (!resp.success) {
      setLoading(false);
      return;
    }
    setSmsLogs(resp.data.smsLogs);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (!token) {
      setSmsViolations([]);
      setSmsStats(null);
      setSmsLogs([]);
      setLoading(false);
      return;
    }
    getSmsViolations(token);
    getSmsLogs(token);
    getSmsStats(token);
  }, [token, isAuthenticated]);

  return (
    <SmsContext.Provider value={{ loading, smsViolations, smsLogs, smsStats }}>
      {children}
    </SmsContext.Provider>
  );
};
