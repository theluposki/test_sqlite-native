import { database } from "../database.js";
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

  if (result) {
    return JSON.parse(JSON.stringify(database.prepare(sql).all(`${like}%`)));
  }

  return [];
};
