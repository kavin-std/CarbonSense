import Machine from "../models/Machine.js";

// GET MACHINES BY FACTORY
export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find({
      factoryId: req.params.factoryId,
    });

    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};