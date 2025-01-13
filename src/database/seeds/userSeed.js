import { hashPassword } from "../../utils/index.js";

export const usersSeeds = [
  {
    nickname: "lucas",
    name: "Lucas P Oliveira",
    birthdate: "2007-04-12",
    email: "lu@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
  {
    nickname: "mylena",
    name: "Mylena G M A de Oliveira",
    birthdate: "1998-06-29",
    email: "my@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
  {
    nickname: "monique",
    name: "Monique Giovana",
    birthdate: "2002-07-07",
    email: "ni@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
];
