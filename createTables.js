import { database } from "./database.js";

const user = () => {
  database.exec(`
        CREATE TABLE IF NOT EXISTS user (
          nickname TEXT PRIMARY KEY,
          nome TEXT,
          idade INTEGER,
          email TEXT UNIQUE,
          senha TEXT
        ) STRICT
  `);
};

export const createTables = () => {
    user();
};
