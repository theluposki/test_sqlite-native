import api from "../../database/api/index.js";
import { validation } from "../../utils/index.js";

export const update = async (req, res) => {
  const { nickname, name, birthdate, gender, email, image } = req.body;
  const id = req.user.id;

  console.log("Update id: ", id);

  if (!nickname)
    return res.status(400).json({ error: "nickname is required!" });
  if (!name) return res.status(400).json({ error: "name is required!" });
  if (!birthdate)
    return res.status(400).json({ error: "birthdate is required!" });
  if (!gender) return res.status(400).json({ error: "gender is required!" });
  if (!email) return res.status(400).json({ error: "e-mail is required!" });

  const user_With_This_Nickname_Already_Exists = api.selectBy({
    table: "users",
    where: { nickname },
  });
  const user_With_This_Email_Already_Exists = api.selectBy({
    table: "users",
    where: { email },
  });

  if (
    user_With_This_Nickname_Already_Exists.nickname ||
    user_With_This_Email_Already_Exists.email
  ) {
    return res.status(400).json({ error: "user already exists" });
  }

  const isValidAge = validation.isValidAge(birthdate);

  if (isValidAge)
    return res.status(400).json({ error: validation.isValidAge(birthdate) });

  const isEmail = validation.isEmail(email);

  if (isEmail)
    return res.status(400).json({ error: validation.isEmail(email) });

  api.update({
    table: "users",
    items: [nickname, name, birthdate, gender, email, image],
    where: { id },
  });

  res.status(200).json({ message: "Usuário editado com sucesso!" });
};
