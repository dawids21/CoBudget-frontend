export const getMonth = (date) => {
  return date.toLocaleDateString("default", { month: "long" });
};
