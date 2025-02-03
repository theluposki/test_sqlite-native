import { readFile, access } from "node:fs/promises";
import jwt from "jsonwebtoken";
import { generateKeyPEMFile } from "../crypto/index.js";
import logger from "../logger.js";

async function readKeyFile(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    logger.err("jwt", `Erro ao ler o arquivo ${filePath}:`, error);
    throw error;
  }
}

try {
  await access("private.key");
} catch (error) {
  logger.err("jwt", "Erro ao verificar a existência das chaves:", error);
  generateKeyPEMFile();
}

const privateKey = await readKeyFile("private.key");
const publicKey = await readKeyFile("public.key");

let accessExpires, refreshExpires;

try {
  const config = await import("../../config.js");
  accessExpires = config.default?.app?.accessTokenExpiresIn || 1;  // Expiração do access token
  refreshExpires = config.default?.app?.refreshTokenExpiresIn || 7;  // Expiração do refresh token

} catch (error) {
  logger.err("jwt", "Erro ao importar config.js:", error);
  accessExpires = 1;
  refreshExpires = 7;
}

const refreshTokens = new Set();

export const signAccessToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, privateKey.toString(), {
    algorithm: "RS256",
    expiresIn: `${accessExpires}h`
  });
};

export const signRefreshToken = (userId) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, privateKey.toString(), {
    algorithm: "RS256",
    expiresIn: `${refreshExpires}d`
  });
  refreshTokens.add(token);
  return token;
};

export const verifyAccessToken = (token) => {
  const options = { algorithms: ["RS256"] };
  return jwt.verify(token, publicKey.toString(), options);
};

export const verifyRefreshToken = (token) => {
  if (!refreshTokens.has(token)) {
    throw new Error("Refresh token inválido ou expirado");
  }
  const options = { algorithms: ["RS256"] };
  const payload = jwt.verify(token, publicKey.toString(), options);
  
  refreshTokens.delete(token); // Uso único — remova após validar
  return payload;
};

export const refreshTokensManager = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};

export default refreshTokensManager;
