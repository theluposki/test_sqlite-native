import { DatabaseSync } from "node:sqlite";
import sqlBricks from "sql-bricks";
import { hashPassword } from "../utils/index.js";
export const database = new DatabaseSync("db.sql");

export function insert({ table, items }) {
  const { text, values } = sqlBricks
    .insertInto(table, items)
    .toParams({ placeholder: "?" });

  const insertStatement = database.prepare(text);

  const result = insertStatement.run(...values);

  if (result.changes > 0) {
    // lastInsertRowid: 3, changes
    return `[\x1b[1mDB\x1b[0m] ${result.changes} ${
      result.changes > 1 ? "items" : "item"
    } inserido com sucesso! -> function: \x1b[1minsert\x1b[0m\n`;
  }

  return "[\x1b[1mDB\x1b[0m]  não foi possivel inserir! -> function: \x1b[1minsert\x1b[0m\n";
}

export const select = ({ table, items = "*", orderBy = "ROWID" }) => {
  const query = sqlBricks
    .select(...items)
    .orderBy(orderBy)
    .from(table)
    .toString();

  const result = database.prepare(query).all();
  return JSON.stringify(result, null, 1);
};

export const runSeeds = async () => {
  const seeds = [
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

  console.log(insert({ table: "users", items: seeds }));

  console.log(select({ table: "users" }));
};
