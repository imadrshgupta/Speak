import { Router } from "express";
import SpeakingController from "../controllers/speaking.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, SpeakingController.createSession);

export default router;