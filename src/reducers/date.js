const date = (state = "", action) => {
  switch (action.type) {
    case "SET_DATE_NOW":
      return action.date;
    default:
      return state;
  }
};

export default date;
