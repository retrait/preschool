const activeRoom = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_ROOM":
      return action.room;
    default:
      return state;
  }
};

export default activeRoom;
