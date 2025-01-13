import { database } from "../database.js";
import sqlBricks from "sql-bricks";
/**
 * Updates records in a specified table with given values and conditions.
 *
 * @function
 * @param {Object} params - The parameters for the update operation.
 * @param {string} params.table - The name of the table to update.
 * @param {Object} params.items - The values to update.
 * @param {Object} params.where - The condition to filter which records to update.
 * @returns {string} A message indicating success or failure of the operation.
 */
export function update({ table, items, where }) {
  const { text, values } = sqlBricks
    .update(table, items)
    .where(where)
    .toParams({ placeholder: "?" });

  const updateStatement = database.prepare(text);

  const result = updateStatement.run(...values);

  if (result.changes > 0) {
    return `[\x1b[1mDB\x1b[0m] ${result.changes} ${
      result.changes > 1 ? "items" : "item"
    } atualizado com sucesso! -> function: \x1b[1mupdate\x1b[0m\n`;
  }

  return "[\x1b[1mDB\x1b[0m]  não foi possivel atualizar! -> function: \x1b[1mupdate\x1b[0m\n";
}
