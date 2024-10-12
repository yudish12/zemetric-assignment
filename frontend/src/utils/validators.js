export const isPhonenumber = (phoneNumber) => {
  const re = /^\d{10}$/;
  return re.test(String(phoneNumber));
};

export const isPassword = (password) => {
  return password.length >= 8;
};
