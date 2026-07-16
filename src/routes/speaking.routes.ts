import { Router } from "express";
import SpeakingController from "../controllers/speaking.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, SpeakingController.createSession);
router.get("/", authenticate, SpeakingController.history);
router.get("/:id", authenticate, SpeakingController.details);
router.delete("/:id", authenticate, SpeakingController.delete)

export default router;