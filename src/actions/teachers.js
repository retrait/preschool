export const saveTeachers = newQuery => {
  return {
    type: "SAVE_TEACHERS",
    teachers: newQuery
  };
};
