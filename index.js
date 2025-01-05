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
import User from "./entities/User.js";

const user = new User({
  nickname: "lucas",
  name: "Lucas P Oliveira",
  birthdate: "2007-04-12",
  email: "lu@mail.com",
  password: "MyPassw0rd#2023",
});

console.log(await user.register());
