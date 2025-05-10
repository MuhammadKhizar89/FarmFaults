
import User from "../models/user.model.js";
import Error from "../models/error.model.js";
import mongoose from 'mongoose';


export const getRankedUsers = async (req, res) => {
    const { time } = req.body; // Time period could be 'weekly', 'monthly', or 'anytime'
        // Step 1: Set the time range based on the provided time period
        let startDate;
        const currentDate = new Date();

        if (time === 'weekly') {
            startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)); // Last 7 days
        } else if (time === 'monthly') {
            startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // Last 30 days
        } else {
            startDate = null; // Fetch all data if 'anytime'
        }

        // Step 2: Fetch errors within the time range
        const matchCondition = startDate ? { createdAt: { $gte: startDate } } : {}; // Filter by time if specified
        const userErrors = await Error.aggregate([
            { $match: matchCondition }, // Only match errors within the time range
            { $group: { _id: "$userId", totalPoints: { $sum: "$points" } } }, // Sum points for each user
            { $sort: { totalPoints: -1 } }, // Sort by totalPoints in descending order
        ]);

        // Step 3: Prepare the userIds from the aggregated errors
        const userIds = userErrors.map(error =>new  mongoose.Types.ObjectId(error._id));

        // Step 4: Fetch user details from Users collection
        const users = await User.find({ _id: { $in: userIds } }).select('firstName lastName avatar');

        // Step 5: Create a response with combined user details and totalPoints
        const response = userErrors.map((error, index) => {
            const user = users.find(user => user._id.toString() === error._id.toString());
            return {
                rank: index + 1,
                userId: error._id,
                name: `${user.firstName} ${user.lastName}`,
                avatar: user.avatar || '/default-avatar.jpg', // Default avatar if not found
                totalPoints: error.totalPoints,
            };
        });

        // Step 6: Send the response
        return res.status(200).json({
            success: true,
            data: response,
        });


};
