import api from "../../database/api/index.js";
import { hashPassword, jwt } from "../../utils/index.js";

export const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "e-mail is required!" });
  if (!password) return res.status(400).json({ error: "password is required!" });

  const userExists = await api.selectBy({ table: "users", where: { email } });

  if (!userExists || !userExists.email) {
    return res.status(400).json({ error: "user does not exist!" });
  }

  const compareHash = await hashPassword.compare(password, userExists.password);
  if (!compareHash) return res.status(400).json({ error: "invalid password!" });

  // Gera tokens de acesso e refresh
  const accessToken = jwt.signAccessToken(userExists.nickname);
  const refreshToken = jwt.signRefreshToken(userExists.nickname);

  // Armazena o access token em cookies e retorna o refresh token no corpo
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false,  // Ajuste para true em produção
    sameSite: "none",
  });

  res.status(200).json({ message: "autenticado com sucesso!", refreshToken });
};
