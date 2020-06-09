const teachers = (state = [], action) => {
  switch (action.type) {
    case "SAVE_TEACHERS":
      return action.teachers;
    default:
      return state;
  }
};

export default teachers;
