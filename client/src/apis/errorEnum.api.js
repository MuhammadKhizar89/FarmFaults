import axios from "../config/axios.config.js";

export const getErrorEnumApiCall = async () => {
    try {
      const response = await axios.get(`/api/error-enum/get`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return { success: false, message: "Server is Down" };
      }
    }
  };
  

  