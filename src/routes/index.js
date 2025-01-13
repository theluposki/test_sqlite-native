import base from "./base.js";
import users from "./user.js"

import { validateToken } from "../middlewares/validToken.js";
const version = "/api/v1" 

export const routes = (app) => {
  app.use('/', base);
  app.use(version+'/users', users)
}