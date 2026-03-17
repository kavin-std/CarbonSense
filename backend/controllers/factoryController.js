import Factory from "../models/Factory.js";
import Machine from "../models/Machine.js";
import { calculateCarbon } from "../utils/carbonCalculator.js";

// 🟢 CREATE FACTORY
export const createFactory = async (req, res) => {
  try {
    const { name, location, industry, ppaType } = req.body;
    const ownerId = req.user.id;

    // check if factory already exists
    const existingFactory = await Factory.findOne({ ownerId });
    if (existingFactory) {
      return res.status(400).json({
        message: "Factory already exists for this user",
      });
    }

    // ✅ CREATE FACTORY
    const factory = await Factory.create({
      name,
      location,
      industry,
      ppaType,
      ownerId,
    });

    // 🔥 AUTO GENERATE MACHINES
    let machines = [];

    if (industry === "automotive") {
      machines = [
        { name: "CNC Drilling", power: 5 },
        { name: "CNC Milling", power: 6 },
        { name: "CNC Grinding", power: 4 },
        { name: "Hydraulic Press", power: 8 },
        { name: "Injection Molding", power: 7 },
        { name: "Welding Machine", power: 3 },
        { name: "Assembly Motor", power: 2 },
        { name: "Paint Booth", power: 5 },
      ];
    }

    // ✅ SAVE MACHINES
    for (let m of machines) {
      const dailyEnergy = m.power * 8; // 8 hours usage

      await Machine.create({
        factoryId: factory._id,
        name: m.name,
        powerRating: m.power,
        dailyEnergy,
        emissionPerDay: calculateCarbon(dailyEnergy, ppaType),
      });
    }

    res.status(201).json({
      message: "Factory created successfully",
      factory,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 GET MY FACTORY
export const getMyFactory = async (req, res) => {
  try {
    const factory = await Factory.findOne({ ownerId: req.user.id });

    res.json(factory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 GET ALL FACTORIES (Officer)
export const getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.find().populate("ownerId", "email");

    res.json(factories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};