import { Router } from "express";
import { controllers } from "../controllers/index.js";
import { validateToken } from "../middlewares/validToken.js"
const router = Router();

router.get("/", validateToken, controllers.user.all);
router.post("/", controllers.user.register);
router.post("/auth", controllers.user.auth);

export default router;
