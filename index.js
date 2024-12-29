import { createTables } from "./createTables.js";
import { insert, getAll } from "./api.js";

createTables();

// insert(
//   `
//     INSERT INTO user (nickname, nome, idade, email, senha) 
//     VALUES (?, ?, ?, ?, ?)
// `,
//   ["lucas", "Lucas P Oliveira", 30, "lu@mail.com", "1234"]
// );

const all = getAll("user");

console.log(all);
