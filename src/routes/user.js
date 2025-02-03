import { Router } from "express";
import { controllers } from "../controllers/index.js";
import { validateToken } from "../middlewares/validToken.js";
const router = Router();

router.get("/", validateToken, controllers.user.all);
router.get("/my", validateToken, controllers.user.my);
router.post("/", controllers.user.register);
router.post("/auth", controllers.user.auth);
router.put("/update", validateToken, controllers.user.update)

export default router;
