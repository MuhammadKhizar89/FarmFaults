import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Store as a string
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
