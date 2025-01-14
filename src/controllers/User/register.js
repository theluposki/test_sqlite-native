import api from "../../database/api/index.js";
import { hashPassword, validation } from "../../utils/index.js";

export const register = async (req, res) => {
  const { nickname, name, birthdate, email, password } = req.body;

  if (!nickname)
    return res.status(400).json({ error: "nickname is required!" });
  if (!name) return res.status(400).json({ error: "name is required!" });
  if (!birthdate)
    return res.status(400).json({ error: "birthdate is required!" });
  if (!email) return res.status(400).json({ error: "e-mail is required!" });
  if (!password)
    return res.status(400).json({ error: "password is required!" });

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

  const isValidPassword = validation.isValidPassword(password);

  if (isValidPassword)
    return res
      .status(400)
      .json({ error: validation.isValidPassword(password) });

  const hash = await hashPassword.hash(password);

  const compareHash = await hashPassword.compare(password, hash);

  if (!compareHash)
    return res.status(400).json({ error: "Could not encrypt password" });

  api.insert({
    table: "users",
    items: [
      {
        nickname,
        name,
        birthdate,
        email,
        password: hash,
      },
    ],
  });

  res.status(201).json({ message: "Usuário criado com sucesso!" });
};
