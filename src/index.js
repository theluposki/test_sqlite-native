import { createTables } from "./database/createTables.js";

createTables();

import User from "./entities/User.js";
import UserService from "./services/UserService.js";

const user = new User({
  nickname: "lucas",
  name: "Lucas P Oliveira",
  birthdate: "2007-04-12",
  email: "lu@mail.com",
  password: "MyPassw0rd#2023",
}).new()

// console.log(await user);

const userService = new UserService().register(await user)

console.log(await userService);