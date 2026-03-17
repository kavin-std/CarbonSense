import express from "express";
import { getMachines } from "../controllers/machineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:factoryId", protect, getMachines);

export default router;