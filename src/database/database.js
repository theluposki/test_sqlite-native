import { DatabaseSync } from "node:sqlite";
import sqlBricks from "sql-bricks";
import { hashPassword } from "../utils/index.js";

/**
 * Establishes a synchronous SQLite database connection.
 * @type {DatabaseSync}
 */
export const database = new DatabaseSync("db.sql");
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
  return JSON.stringify(result, null, 1);
};

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
  return JSON.stringify(result, null, 1);
};

/**
 * Realiza uma consulta SELECT com LIKE no banco de dados SQLite.
 *
 * @param {Object} params - Objeto contendo os parâmetros da consulta.
 * @param {string} params.table - Nome da tabela a ser consultada.
 * @param {string} params.where - Cláusula WHERE da consulta.
 * @param {string} params.like - Valor para o LIKE.
 * @returns {string} A consulta SQL preparada como uma string JSON.
 */
export const selectByLike = ({ table, where, like }) => {
  const sql = `SELECT * FROM ${table} WHERE ${where} LIKE ?;`;

  return JSON.stringify(database.prepare(sql).all(`${like}%`), null, 2);
};

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

/**
 * Seeds the database with initial user data.
 *
 * @async
 * @function
 * @returns {Promise<void>} Logs the result of the insert and select operations.
 */
export const runSeeds = async () => {
  const seeds = [
    {
      nickname: "lucas",
      name: "Lucas P Oliveira",
      birthdate: "2007-04-12",
      email: "lu@mail.com",
      password: await hashPassword.hash("MyPassw0rd#2023"),
    },
    {
      nickname: "mylena",
      name: "Mylena G M A de Oliveira",
      birthdate: "1998-06-29",
      email: "my@mail.com",
      password: await hashPassword.hash("MyPassw0rd#2023"),
    },
    {
      nickname: "monique",
      name: "Monique Giovana",
      birthdate: "2002-07-07",
      email: "ni@mail.com",
      password: await hashPassword.hash("MyPassw0rd#2023"),
    },
  ];

  console.log(insert({ table: "users", items: seeds }));

  console.log(
    update({
      table: "users",
      items: { email: "luposki@mail.com" },
      where: { nickname: "lucas" },
    })
  );

  console.log(delet({ table: "users", where: { nickname: "lucas" } }));
  //   console.log(select({ table: "users" }));
  //   console.log(selectBy({ table: 'users', where: { nickname: 'mylena' }}))
  console.log(selectByLike({ table: "users", where: "nickname", like: "m%" }));
};
