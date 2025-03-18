import { Router } from "express";
import TrainerController from "../controller/trainers.controller.js";

const router = Router();

router.get("", TrainerController.getAllTrainers);
router.get("/:id", TrainerController.getTrainerById);
router.post("", TrainerController.createTrainer);
router.put("/:id", TrainerController.updateTrainer);
router.delete("/:id", TrainerController.deleteTrainer);
router.delete("", TrainerController.deleteAllTrainers);

export default router;