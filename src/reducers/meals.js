const meals = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ACTIVITY_MEALS":
      return action.meals;
    default:
      return state;
  }
};

export default meals;
