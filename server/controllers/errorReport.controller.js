import Error from "../models/error.model.js";
import Leaderboard from "../models/leaderboard.model.js";

export async function addError(req, res, next) {
  const { type, photos, description, points, location } = req.body;
  const userId = req.userId;
  if (!type || !photos || !points || !location || !location.longitude || !location.latitude) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existingError = await Error.findOne({
    userId,
    type,
    "location.longitude": Number(location.longitude),
    "location.latitude": Number(location.latitude),
  });
  if (existingError) {
    return res.status(400).send({ message: "Error with this location and type already exists for this user" });
  }
  const newError = new Error({
    type,
    photos,
    description,
    points,
    location: {
      longitude: Number(location.longitude),
      latitude: Number(location.latitude),
    },
    userId,
  });
  await newError.save();
  const userLeaderboard = await Leaderboard.findOne({ userId });
  if (userLeaderboard) {
    userLeaderboard.totalPoints += points;
    await userLeaderboard.save();
  } else {
    const newLeaderboardEntry = new Leaderboard({
      userId,
      totalPoints: points,
    });
    await newLeaderboardEntry.save();
  }

  return res.status(201).send({ message: "Error added successfully", data: newError });
}

export async function getAllErrors(req, res, next) {
  const data = await Error.find();
  return res.status(200).send({ message: "All data fetched successfully", data });
}
