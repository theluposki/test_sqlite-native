const isValidGender = (gender) => {
  if (!gender === "M" || !gender === "F") {
    return "error gender format supports 'M' or 'F'";
  }
};

export default isValidGender
