import { database } from "../database.js";
import sqlBricks from "sql-bricks";
/**
 * Inserts items into a specified table in the database.
 *
 * @function
 * @param {Object} params - The parameters for the insert operation.
 * @param {string} params.table - The name of the table to insert into.
 * @param {Object|Object[]} params.items - The item(s) to insert into the table.
 * @returns {string} A message indicating success or failure of the operation.
 */
export function insert({ table, items }) {
  const { text, values } = sqlBricks
    .insertInto(table, items)
    .toParams({ placeholder: "?" });

  const insertStatement = database.prepare(text);

  const result = insertStatement.run(...values);

  if (result.changes > 0) {
    // lastInsertRowid: 3, changes
    return `[\x1b[1mDB\x1b[0m] ${result.changes} ${
      result.changes > 1 ? "items" : "item"
    } inserido com sucesso! -> function: \x1b[1minsert\x1b[0m\n`;
  }

  return "[\x1b[1mDB\x1b[0m]  não foi possivel inserir! -> function: \x1b[1minsert\x1b[0m\n";
}
