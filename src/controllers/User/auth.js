import api from "../../database/api/index.js";
import { hashPassword, jwt } from "../../utils/index.js";

export const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "e-mail is required!" });
  if (!password)
    return res.status(400).json({ error: "password is required!" });

  const userExists = api.selectBy({ table: "users", where: { email } });

  if (!userExists.email)
    return res.status(400).json({ error: "user does not exist!" });

  const compareHash = await hashPassword.compare(password, userExists.password);

  if (!compareHash) return res.status(400).json({ error: "invalid password!" });

  const token = jwt.sign(userExists.nickname);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  res.status(200).json({ message: "autenticado com sucesso!" });
};
