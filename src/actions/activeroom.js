export const setActiveRoom = newQuery => {
  return {
    type: "SET_ACTIVE_ROOM",
    room: newQuery
  };
};
