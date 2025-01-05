/**
 * Checks if all required properties are present and non-empty in the given object.
 *
 * @param {Object} body - The object to validate.
 * @param {string[]} requiredProperties - An array of property names that are required.
 * @returns {string|null} Returns a message indicating which property is missing or empty, or null if all properties are valid.
 *
 * @example
 * // returns null
 * isRequired({ name: "John", age: 30 }, ["name", "age"]);
 *
 * @example
 * // returns "email is mandatory."
 * isRequired({ name: "John" }, ["name", "email"]);
 */
const isRequired = (body, requiredProperties) => {
  for (const property of requiredProperties) {
    if (!body.hasOwnProperty(property) || body[property] === null || body[property] === undefined || body[property] === "") {
      return `${property} is mandatory.`;
    }
  }
  return null;
};

export default isRequired;