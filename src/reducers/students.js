const students = (state = [], action) => {
  switch (action.type) {
    case "SAVE_STUDENTS":
      return action.students;
    default:
      return state;
  }
};

export default students;
