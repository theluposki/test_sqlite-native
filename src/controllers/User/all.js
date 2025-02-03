import api from "../../database/api/index.js";

export const all = (req, res) => {
  const result = api.select({
    table: "users",
    items: ["id", "nickname", "name", "email","gender", "image", "birthdate"],
  });

  res.status(200).json(result);
};
