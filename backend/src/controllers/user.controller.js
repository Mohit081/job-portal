import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import cloudinary from "../utlis/cloudinary.js";
import getDataUri from "../utlis/datauri.js";

const generateAccessAndrefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "user not find");
    }
    const accessToken = user.generateAccesstoken();
    const refreshToken = user.generateRefreshtoken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      700,
      "something went wrong while generating refreshToken"
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;

  if (!fullName || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "fill all necessary details");
  }
  console.log(fullName,email,phoneNumber,role,password)

const file = req.file;
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  console.log("cloudinary mai dikkar hai ",cloudResponse.secure_url)
  
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    console.log("hai")
    throw new ApiError(400, "email is already registed");
  }

  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role,
    profile: {
      profilePhoto: cloudResponse.secure_url,
    },
  });

  if (!user) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user created successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "something is missing in");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "user doesn`t find ");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "password is incorrect");
  }

  if (role !== user.role) {
    throw new ApiError(400, "account doesn`t exist with this role");
  }

  const { refreshToken, accessToken } = await generateAccessAndrefreshTokens(
    user?._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken" 
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "user logged in succcessfully"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out succesfully"));
});

const profileupdate = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

  const userId = req.id;

  if (!userId) {
    throw new ApiError(400, "userId not find");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "user not find");
  }

  if (fullName) user.fullName = fullName;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;

  let skillArray;
  if (skills) {
    skillArray = skills.split(",");
    user.profile.skills = skillArray;
  }

  if (cloudResponse) {
    user.profile.resume = cloudResponse.secure_url;
    user.profile.resumeOriginalName = file.originalname;
  }
  await user.save();

  const updatedUser = await User.findById(userId).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "update profile successfully"));
});

export { userRegister, userLogin, userLogout, profileupdate };
