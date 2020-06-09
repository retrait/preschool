const toilet = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ACTIVITY_TOILET":
      return action.toilet;
    default:
      return state;
  }
};

export default toilet;
