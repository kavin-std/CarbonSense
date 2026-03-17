import EnergyLog from "../models/EnergyLog.js";
import Machine from "../models/Machine.js";
import Factory from "../models/Factory.js";
import { calculateCarbon } from "../utils/carbonCalculator.js";

// 🟢 ADD ENERGY LOG
export const addEnergyLog = async (req, res) => {
  try {
    const { factoryId, machineId, energyConsumed } = req.body;

    // get factory
    const factory = await Factory.findById(factoryId);
    if (!factory) {
      return res.status(404).json({ message: "Factory not found" });
    }

    // calculate carbon
    const carbonEmission = calculateCarbon(
      energyConsumed,
      factory.ppaType
    );

    const log = await EnergyLog.create({
      factoryId,
      machineId,
      energyConsumed,
      carbonEmission,
    });

    res.status(201).json({
      message: "Energy log added",
      log,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 GET ENERGY LOGS
export const getEnergyLogs = async (req, res) => {
  try {
    const logs = await EnergyLog.find({
      factoryId: req.params.factoryId,
    }).populate("machineId", "name");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};