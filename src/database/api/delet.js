import { database } from "../database.js";
import sqlBricks from "sql-bricks";

/**
 * Deletes records from a specified table with given conditions.
 *
 * @function
 * @param {Object} params - The parameters for the delete operation.
 * @param {string} params.table - The name of the table to delete from.
 * @param {Object} params.where - The condition to filter which records to delete.
 * @returns {string} A message indicating success or failure of the operation.
 */
export const delet = ({ table, where }) => {
  const { text, values } = sqlBricks
    .delete(table)
    .where(where)
    .toParams({ placeholder: "?" });

  const deleteStatement = database.prepare(text);

  const result = deleteStatement.run(...values);

  if (result.changes > 0) {
    return `[\x1b[1mDB\x1b[0m] ${result.changes} ${
      result.changes > 1 ? "items" : "item"
    } deletado com sucesso! -> function: \x1b[1mdelet\x1b[0m\n`;
  }

  return "[\x1b[1mDB\x1b[0m]  não foi possivel deletar! -> function: \x1b[1mdelet\x1b[0m\n";
};
