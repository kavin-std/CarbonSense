import mongoose from "mongoose";

const energyLogSchema = new mongoose.Schema(
  {
    factoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
      required: true,
    },
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    energyConsumed: {
      type: Number, // kWh
      required: true,
    },
    carbonEmission: {
      type: Number, // kg CO2
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const EnergyLog = mongoose.model("EnergyLog", energyLogSchema);

export default EnergyLog;