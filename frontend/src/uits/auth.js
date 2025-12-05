export const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // returns true or false
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
