import { ApiError } from "../utlis/ApiError.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;


  if (!token) {
    throw new ApiError(400, "unauthorized request");
  }

  const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.id = decodeToken._id; 
  next(); 
});

export { verifyJWT };
