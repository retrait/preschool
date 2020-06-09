const sleep = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ACTIVITY_SLEEP":
      return action.sleep;
    default:
      return state;
  }
};

export default sleep;
