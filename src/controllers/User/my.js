import api from "../../database/api/index.js";

export const my = (req, res) => {
  const result = api.selectBy({
    table: "users",
    items: ["id", "nickname", "name", "email", "birthdate", "gender", "image","created"],
    where: { id: req.user.id },
  });

  res.status(200).json(result);
};
