import { datatime, jwt } from "../utils/index.js";

export const validateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token);

      const now = Date.now().valueOf() / 1000;
      if (decoded.exp < now) {
        res.status(401).json({ error: "Authentication failed: token expired" });
        return;
      }

      req.user = {
        id: decoded.id,
        exp: datatime.tokenDateExp(decoded.exp),
      };

      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed: invalid token" });
    }
  } else {
    res
      .status(401)
      .json({ error: "Authentication failed: token cookie missing" });
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
