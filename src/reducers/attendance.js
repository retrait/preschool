const attendance = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ATTENDANCE":
      return action.attendance;
    default:
      return state;
  }
};

export default attendance;
