/**
 * Validates if a given password meets specific security requirements.
 *
 * The validation is performed using a regular expression:
 * - `^(?=.*\d)` ensures the presence of at least one digit (0-9).
 * - `(?=.*[a-z])` ensures the presence of at least one lowercase letter (a-z).
 * - `(?=.*[A-Z])` ensures the presence of at least one uppercase letter (A-Z).
 * - `(?=.*[$*&@#])` ensures the presence of at least one special character from the set: $, *, &, @, #.
 * - `[0-9a-zA-Z$*&@#]{12,}$` ensures the password is at least 12 characters long and contains only allowed characters.
 *
 * @param {string} password - The password string to validate.
 * @returns {string|null} Returns an error message if the password is invalid, or null if it is valid.
 *
 * @example
 * // returns null
 * isValidPassword("MySecurePass@2023");
 *
 * @example
 * // returns the detailed error message
 * isValidPassword("weakpass");
 */
const msgError = `1. Must be at least 12 characters long.
2. Must contain at least one capital letter (A-Z).
3. It must contain at least one special character among the following: @, #, $, %, ^, &, +, =, * or !.
4. Must not contain 3 to 12 digit sequential numbers such as 123, 4567, 89012, etc.
Valid password example: MyPassw0rd#2023`;

const isValidPassword = (password) => {
  const _regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{12,}$/;
  const result = _regexPassword.test(password.trim());

  if (!result) return msgError;

  return null;
};

export default isValidPassword;
