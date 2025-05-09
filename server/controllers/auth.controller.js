import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../errors/error.js";
import User from "../models/user.model.js";
import Leaderboard from "../models/leaderboard.model.js";

export const signup = async (req, res, next) => {
  // avatar is skipped for now
  const { firstName, lastName, email, dob, password, remember } = req.body;
  // firstName, lastName and email validation is handeled by mongoose refer /models/user.model.js
  if (
    typeof firstName != "string" ||
    typeof lastName != "string" ||
    typeof dob != "string" ||
    typeof email != "string" ||
    typeof password != "string" ||
    typeof remember != "boolean"
  ) {
    return next(
      errorHandler(
        400,
        "Expected Body of type {firstName: string, lastName: string, dob: string email: string, password: string, remember: boolean}"
      )
    );
  }

  // password validation
  const salt = parseInt(process.env.SALT);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    dob,
    password: hashedPassword,
    email,
  });
  await newUser.save();

  const leaderboardInstance = new Leaderboard({
    userId: newUser._id,
    totalPoints: 0,
  });
  await leaderboardInstance.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  const { password: pass, ...user } = newUser._doc;
  if (remember) {
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(201)
      .send({ success: true, message: "Account Created!!!" });
  } else {
    return res
      .header("Authorization", `Bearer ${token}`)
      .status(201)
      .send({ success: true, message: "Account Created!!!" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof email != "string" || typeof password != "string") {
    return next(
      errorHandler(
        400,
        "Expected Body of type {email: string, password: string}"
      )
    );
  }

  const validUser = await User.findOne({ email });
  if (!validUser) return next(errorHandler(404, "User not found!"));
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .header("Authorization", `Bearer ${token}`)
    .status(201)
    .send({ success: true, message: "Login Successfull!" });
};

export async function verify(req, res, next) {
  return res
    .status(200)
    .send({ success: true, message: "Authentication Successfull." });
}

export async function logout(req, res, next) {
  res.clearCookie("access_token", {
  });
  res.status(200).send({ success: true, message: "Logout Successfull" });
}


export async function updateAvatar(req, res, next) {
  const userId = req.userId;
  const { avatar } = req.body;

  if (typeof avatar != "string") {
    return next(errorHandler(400, "Expected Body of type {avatar: string}"));
  }

  await User.findByIdAndUpdate(userId, { avatar }, { new: true });

  res.status(200).send({
    success: true,
    message: "Avatar updated successfully",
  });
}




export async function deleteUser(req, res, next) {
  const userId = new mongoose.Types.ObjectId(req.userId);
  await User.findByIdAndDelete(req.userId);
  await Leaderboard.deleteOne({ userId });
  await Error.deleteOne({ userId });
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res
    .status(200)
    .header("Authorization", `Bearer ${token}`)
    .send({ success: true, message: "User Deleted." });
}



export async function getUser(req, res, next) {
  const userId = req.userId;
  const _user = await User.findById(userId);
  const user = {
    _id: userId,
    firstName: _user.firstName,
    lastName: _user.lastName,
    dob: _user.dob,
    email: _user.email,
    avatar: _user.avatar,
  };

  return res
    .status(201)
    .send({ success: true, message: "User Retrieved.", data: user });
}

