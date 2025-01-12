import { database } from "./database.js";

export const insert = (query, dados) => {
  database.prepare(query).run(...dados);
};

export const getAll = (table) => {
  const rows = database.prepare(`SELECT * FROM ${table};`).all();

  return JSON.parse(JSON.stringify(rows));
};
