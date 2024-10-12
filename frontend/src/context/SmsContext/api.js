import { config } from "../../config";

export const sendSmsApi = async (phoneNumber, message) => {
  try {
    const res = await fetch(`${config.apiUrl}/sms/public`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        message: message,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data.message, field: data.field };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};

export const getSmsViolationsApi = async (token) => {
  try {
    const res = await fetch(`${config.apiUrl}/sms/violations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message, field: data.field };
    }
    return { data: { ...data }, success: true };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};

export const getSmsStatsApi = async (token) => {
  try {
    const res = await fetch(`${config.apiUrl}/sms/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message, field: data.field };
    }
    return { data: { ...data }, success: true };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};

export const getSmsLogsApi = async (token) => {
  try {
    const res = await fetch(`${config.apiUrl}/sms/logs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message, field: data.field };
    }
    return { data: { ...data }, success: true };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};
