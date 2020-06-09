const rooms = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ROOMS":
      return action.rooms;
    default:
      return state;
  }
};

export default rooms;
