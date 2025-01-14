import { Router } from "express";
import { controllers } from "../controllers/index.js";

const router = Router();

router.get("/", controllers.user.all);
router.post("/", controllers.user.register);
router.post("/auth", controllers.user.auth);

export default router;
