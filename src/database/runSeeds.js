import api from "./api/index.js";
import seeds from "./seeds/index.js";

export const runSeeds = async () => {
  const usersSeeds = api.insert({ table: "users", items: seeds.usersSeeds });

  console.log(usersSeeds);
};
