export const saveRooms = newQuery => {
  return {
    type: "SAVE_ROOMS",
    rooms: newQuery
  };
};
