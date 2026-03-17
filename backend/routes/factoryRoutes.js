import express from "express";
import {
  createFactory,
  getMyFactory,
  getAllFactories,
} from "../controllers/factoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createFactory);
router.get("/my", protect, getMyFactory);
router.get("/all", protect, getAllFactories);

export default router;