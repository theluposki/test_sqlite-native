import { DatabaseSync } from "node:sqlite";

/**
 * Establishes a synchronous SQLite database connection.
 * @type {DatabaseSync}
 */
export const database = new DatabaseSync("db.sql");
