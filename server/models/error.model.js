import mongoose from "mongoose";

const errorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
    },
    points: {
      type: Number,
      required: true,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Error = mongoose.model("Error", errorSchema);

export default Error;
