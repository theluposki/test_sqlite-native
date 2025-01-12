import { database } from "./database.js";

const usersTable = () => {
  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        nickname TEXT PRIMARY KEY,
        name TEXT,
        birthdate TEXT,
        email TEXT UNIQUE,
        password TEXT
      ) STRICT
`);
    console.log(
      "[\x1b[1mDB\x1b[0m] tabela de usuários criada com sucesso! -> function: \x1b[1musersTable\x1b[0m\n"
    );
  } catch (error) {
    console.log(
      "[\x1b[1mDB\x1b[0m] não foi possivel criar tabela de usuários!!! -> function: \x1b[1musersTable\x1b[0m\n"
    );
  }
};

export const createTables = () => {
  usersTable();
};
