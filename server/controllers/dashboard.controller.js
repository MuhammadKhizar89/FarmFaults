import User from "../models/user.model.js";
import Leaderboard from "../models/leaderboard.model.js";
import Error from "../models/error.model.js";
import mongoose from 'mongoose'; 
import { errorHandler } from "../errors/error.js";


export const getUserStats = async (req, res,next) => {
    const userId  = req.userId;

    if (!userId) {
        return next(errorHandler(404, "User ID is required"));
    }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const user = await User.findById(userObjectId);
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const leaderboardEntry = await Leaderboard.findOne({ userId: userObjectId });
        if (!leaderboardEntry) {
            return res.status(404).send({ success: false, message: "Leaderboard entry not found for this user" });
        }

        const totalErrors = await Error.countDocuments({ userId: userObjectId });

        const rank = await Leaderboard.countDocuments({ totalPoints: { $gt: leaderboardEntry.totalPoints } }) + 1;

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
            },
            stats: {
                totalPoints: leaderboardEntry.totalPoints,
                totalErrors,
                rank,
            },
            message: "Stats Retrieved"
        });
    
};



export const getTopUsers = async (req, res) => {
        // Step 1: Fetch the top 5 users from the Leaderboard
        const topUsers = await Leaderboard.find({})
            .sort({ totalPoints: -1 }) // Sort by totalPoints in descending order
            .limit(5); // Limit to the top 5 users

        // Step 2: Prepare an array of userIds to fetch user details
        const userIds = topUsers.map(user => user.userId).filter(id => new mongoose.Types.ObjectId(id));

        // Step 3: Fetch user details for these userIds
        const usersDetails = await User.find({ _id: { $in: userIds.map(id =>new  mongoose.Types.ObjectId(id)) } })
            .select('firstName lastName avatar');

        // Step 4: Create a map of user details for easy access
        const userDetailsMap = {};
        usersDetails.forEach(user => {
            userDetailsMap[user._id] = {
                name: `${user.firstName} ${user.lastName}`,
                avatar: user.avatar,
            };
        });

        // Step 5: Prepare the response with combined data
        const response = topUsers.map(user => ({
            userId: user.userId,
            name: userDetailsMap[user.userId]?.name || 'Unknown User', // Fallback if user details are not found
            avatar: userDetailsMap[user.userId]?.avatar || '/default-avatar.jpg', // Default avatar if not found
            totalPoints: user.totalPoints,
        }));

        // Step 6: Send the response
        return res.status(200).json({
            success: true,
            data: response,
        });

};