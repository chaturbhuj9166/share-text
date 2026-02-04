import mongoose from "mongoose";

const sharedTextSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    text: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("SharedText", sharedTextSchema);
