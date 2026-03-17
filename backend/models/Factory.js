import mongoose from "mongoose";

const factorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    ppaType: {
      type: String,
      enum: ["coal", "solar", "wind", "hydro"],
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 🔥 ONLY ONE factory per owner
    },
  },
  { timestamps: true }
);

const Factory = mongoose.model("Factory", factorySchema);

export default Factory;