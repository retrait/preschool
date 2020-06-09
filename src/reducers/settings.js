const settings = (state = [], action) => {
  switch (action.type) {
    case "SAVE_SETTINGS":
      return action.settings;
    default:
      return state;
  }
};

export default settings;
