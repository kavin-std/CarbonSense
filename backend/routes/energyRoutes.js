import express from "express";
import {
  addEnergyLog,
  getEnergyLogs,
} from "../controllers/energyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/log", protect, addEnergyLog);
router.get("/:factoryId", protect, getEnergyLogs);

export default router;