import { config } from "../../config";
export const getUserApi = async (token) => {
  try {
    const res = await fetch(`${config.apiUrl}/user`, {
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
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const loginApi = async (phoneNumber, password) => {
  try {
    const res = await fetch(`${config.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message, field: data.field };
    }
    console.log(data);
    return { success: true, data };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};

export const signupApi = async (phoneNumber, password, name) => {
  try {
    const res = await fetch(`${config.apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
        name: name,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message, field: data.field };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error, field: "toast" };
  }
};
