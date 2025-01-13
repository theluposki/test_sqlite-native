import { database } from "../database.js";
import sqlBricks from "sql-bricks";

/**
 * Selects a single record from a specified table with a given condition.
 *
 * @function
 * @param {Object} params - The parameters for the select operation.
 * @param {string} params.table - The name of the table to select from.
 * @param {Object} params.where - The condition to filter the records.
 * @returns {string} The selected record in JSON format.
 */
export const selectBy = ({ table, where }) => {
  const query = sqlBricks.select("*").from(table).where(where).toString();

  const result = database.prepare(query).get();

  if (result) {
    return JSON.parse(JSON.stringify(result));
  }

  return {};
};
