import axios from "../config/axios.config.js";

export const getleaderBoardRankedUsers = async (time="") => {
  try {
    const response = await axios.post('/api/leaderboard/getleaderboardUsers', {
        time: time,
    });    
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};






