// import { createTables } from "./createTables.js";
// import { insert, getAll } from "./api.js";

// createTables();

// // insert(
// //   `
// //     INSERT INTO user (nickname, nome, idade, email, senha) 
// //     VALUES (?, ?, ?, ?, ?)
// // `,
// //   ["lucas", "Lucas P Oliveira", 30, "lu@mail.com", "1234"]
// // );

// const all = getAll("user");

// console.log(all);
import User from './entities/User.js'


const user = new User("lucas", "Lucas P Oliveira", 30, "lu@mail.com", "1234")

console.log(await user.new())

console.log(process.env.PORT)