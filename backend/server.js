import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import factoryRoutes from "./routes/factoryRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import energyRoutes from "./routes/energyRoutes.js";


dotenv.config();

const app = express();

// connect database
connectDB();

app.use(express.json());

app.use("/api/energy", energyRoutes);

app.use("/api/machine", machineRoutes);

app.use("/api/factory", factoryRoutes);

app.use("/api/auth", authRoutes);

app.use(cors());


app.get("/", (req, res) => {
  res.json({ message: "CarbonSense Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});