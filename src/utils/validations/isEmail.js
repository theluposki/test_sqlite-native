/**
 * Validates if a given string is a properly formatted email address.
 *
 * The validation is performed using a regular expression:
 * - `^[a-zA-Z0-9._-]+` matches the beginning of the string and allows letters, digits, dots, underscores, and hyphens before the "@" symbol.
 * - `@[a-zA-Z0-9.-]+` matches the "@" symbol followed by domain characters, allowing letters, digits, dots, and hyphens.
 * - `\.[a-zA-Z]{2,4}$` ensures a dot followed by 2 to 4 letters, representing the top-level domain (e.g., .com, .net).
 *
 * @param {string} email - The email address to validate.
 * @returns {string|null} Returns an error message if the email is invalid, or null if it is valid.
 *
 * @example
 * // returns null
 * isEmail("example@example.com");
 *
 * @example
 * // returns "invalid email."
 * isEmail("invalid-email");
 */
const isEmail = (email) => {
  const _regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const result = _regexEmail.test(email);

  const msgError = "invalid email.";

  if (!result) return msgError;

  return null;
};

export default isEmail;
