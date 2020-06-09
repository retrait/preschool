export const saveStudents = newQuery => {
  return {
    type: "SAVE_STUDENTS",
    students: newQuery
  };
};
