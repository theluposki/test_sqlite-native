import { randomUUID } from "node:crypto";
import { hashPassword } from "../../utils/index.js";
import images from "../../defaults/default_image.js";

export const usersSeeds = [
  {
    id: randomUUID(),
    nickname: "lucas",
    name: "Lucas P Oliveira",
    birthdate: "2007-04-12",
    gender: "M",
    image: images[0],
    email: "lu@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
  {
    id: randomUUID(),
    nickname: "mylena",
    name: "Mylena G M A de Oliveira",
    birthdate: "1998-06-29",
    gender: "F",
    image: images[1],
    email: "my@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
  {
    id: randomUUID(),
    nickname: "monique",
    name: "Monique Giovana",
    birthdate: "2002-07-07",
    gender: "F",
    image: images[1],
    email: "ni@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
  {
    id: randomUUID(),
    nickname: "marcela",
    name: "Marcela G M Albuquerque",
    birthdate: "2002-07-07",
    gender: "F",
    image: images[1],
    email: "ma@mail.com",
    password: await hashPassword.hash("MyPassw0rd#2023"),
  },
];
