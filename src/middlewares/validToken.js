import { datatime, jwt } from "../utils/index.js";

export const validateToken = async (req, res, next) => {
  const token = req.cookies.token;
  const refreshToken = req.body.refreshToken || req.cookies.refreshToken;

  if (token) {
    try {
      const decoded = jwt.verifyAccessToken(token);

      const now = Date.now().valueOf() / 1000;
      if (decoded.exp < now) {
        return res.status(401).json({ error: "Authentication failed: token expired" });
      }

      req.user = {
        id: decoded.id,
        exp: datatime.tokenDateExp(decoded.exp),
      };

      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed: invalid token" });
    }
  } else if (refreshToken) {
    try {
      const decodedRefresh = jwt.verifyRefreshToken(refreshToken);
      const newAccessToken = jwt.signAccessToken(decodedRefresh.id);

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: false,  // Ajuste para true em produção
        sameSite: "none",
      });

      req.user = {
        id: decodedRefresh.id,
        exp: datatime.tokenDateExp(decodedRefresh.exp),
      };

      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed: invalid refresh token" });
    }
  } else {
    res.status(401).json({ error: "Authentication failed: no token provided" });
  }
};


/* no cliente

import axios from "axios";
import config from "./config.js"

export const api = axios.create({
  baseURL: config.BASE_URL,
  mode: "no-cors",
  cache: "no-cache",
  withCredentials: true,
  referrerPolicy: "origin",
  headers: {
    "Content-Type": "application/json",
  },
});

*/
