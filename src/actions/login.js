export const loginchecker = newQuery => {
  return {
    type: "LOGIN",
    loggedIn: newQuery
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const fetchSettings = newQuery => {
  return {
    type: "SAVE_SETTINGS",
    settings: newQuery
  };
};
