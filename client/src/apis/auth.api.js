import axios from "../config/axios.config.js";



export const getUserApiCall = async () => {
  try {
    const response = await axios.get("/api/auth/get/user");
    console.log("sa",response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};

export const deletetUserApiCall = async () => {
  try {
    const response = await axios.delete("/api/auth/delete/user");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};



export const updateAvatarApiCall = async (avatar) => {
  try {
    const response = await axios.post("/api/auth/update/avatar", { avatar });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};
export const signinApiCall = async (body) => {
  try {
    const response = await axios.post(`/api/auth/signin`, body);
    const token = response.headers["authorization"].split(" ")[1];
    localStorage.setItem("access_token", token);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};

export const signupApiCall = async (body) => {
  try {
    const response = await axios.post(`/api/auth/signup`, body);
    const token = response.headers["authorization"].split(" ")[1];
    localStorage.setItem("access_token", token);

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};

