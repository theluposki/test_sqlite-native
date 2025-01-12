import { DatabaseSync } from 'node:sqlite';
export const database = new DatabaseSync('db.sql');
