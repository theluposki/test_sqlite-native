import { database } from "../database.js";
import sqlBricks from "sql-bricks";

/**
 * Selects data from a specified table in the database.
 *
 * @function
 * @param {Object} params - The parameters for the select operation.
 * @param {string} params.table - The name of the table to select from.
 * @param {string|string[]} [params.items="*"] - The columns to select.
 * @param {string} [params.orderBy="ROWID"] - The column to order the results by.
 * @returns {string} The selected data in JSON format.
 */
export const select = ({ table, items = "*", orderBy = "ROWID" }) => {
  const query = sqlBricks
    .select(...items)
    .orderBy(orderBy)
    .from(table)
    .toString();

  const result = database.prepare(query).all();

  if(result) {
    return JSON.parse(JSON.stringify(result))
  }

  return []
};
