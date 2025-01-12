/**
 * Validates if a given birthdate represents a valid age.
 *
 * This function checks if the provided birthdate is in a valid format ("YYYY-MM-DD"),
 * calculates the age based on the current year, and validates the age range.
 *
 * @param {string} birthdate - The birthdate in "YYYY-MM-DD" format.
 * @returns {string|null} Returns a string describing the validation error, or null if the age is valid.
 *
 * @example
 * // returns null
 * isValidAge("2000-05-15");
 *
 * @example
 * // returns "birthdate is mandatory."
 * isValidAge("");
 *
 * @example
 * // returns "format error [invalid-date]"
 * isValidAge("invalid-date");
 *
 * @example
 * // returns "17 cannot be underage."
 * isValidAge("2023-01-01");
 *
 * @example
 * // returns "131 maximum age reached."
 * isValidAge("1800-01-01");
 */
const isValidAge = (birthdate) => {
  if (!birthdate) return "birthdate is mandatory.";

  if (birthdate.split("-").length !== 3) {
    return `format error [${birthdate}]`;
  }

  const currentDate = new Date().getFullYear();
  const year = new Date(birthdate).getFullYear();
  const age = currentDate - year;

  if (age <= 17) {
    return `${age} cannot be underage.`;
  }

  if (age > 130) {
    return `${age} maximum age reached.`;
  }

  return null;
};

export default isValidAge;
