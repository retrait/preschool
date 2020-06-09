export const saveMealsToday = newQuery => {
  return {
    type: "SAVE_ACTIVITY_MEALS",
    meals: newQuery
  };
};
export const saveToiletToday = newQuery => {
  return {
    type: "SAVE_ACTIVITY_TOILET",
    toilet: newQuery
  };
};
export const saveSleepToday = newQuery => {
  return {
    type: "SAVE_ACTIVITY_SLEEP",
    sleep: newQuery
  };
};
export const saveAttendance = newQuery => {
  return {
    type: "SAVE_ATTENDANCE",
    attendance: newQuery
  };
};
