import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    factoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    powerRating: {
      type: Number, // in kW
      required: true,
    },
    dailyEnergy: {
      type: Number, // kWh
      required: true,
    },
    emissionPerDay: {
      type: Number, // kg CO2
      required: true,
    },
  },
  { timestamps: true }
);

const Machine = mongoose.model("Machine", machineSchema);

export default Machine;