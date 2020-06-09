export const getDate = newQuery => {
  return {
    type: "SET_DATE_NOW",
    date: newQuery
  };
};
