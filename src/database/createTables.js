import { database  } from "./database.js";

const dropUsersTable = () => {
  try {
    database.exec(` 
      DROP TABLE IF EXISTS users;
`);
    console.log(
      "[\x1b[1mDB\x1b[0m] tabela de usuários destruida com sucesso! -> function: \x1b[1mdropUsersTable\x1b[0m\n"
    );
  } catch (error) {
    console.log(
      "[\x1b[1mDB\x1b[0m] não foi possivel destruida tabela de usuários!!! -> function: \x1b[1mdropUsersTable\x1b[0m\n"
    );
  }
};

const createUsersTable = () => {
  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nickname TEXT UNIQUE,
        name TEXT,
        birthdate TEXT,
        gender TEXT,
        image TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created TEXT DEFAULT (strftime('%s', 'now') * 1000)
      ) STRICT
`);
    console.log(
      "[\x1b[1mDB\x1b[0m] tabela de usuários criada com sucesso! -> function: \x1b[1mcreateUsersTable\x1b[0m\n"
    );
  } catch (error) {
    console.error(error)
    console.log(
      "[\x1b[1mDB\x1b[0m] não foi possivel criar tabela de usuários!!! -> function: \x1b[1mcreateUsersTable\x1b[0m\n"
    );
  }
};

export const createTables = () => {
  dropUsersTable();
  createUsersTable();
};
