import { asyncHandler } from "../utlis/asyncHandler.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { Company } from "../models/company.model.js";
import { isValidObjectId } from "mongoose";
import getDataUri from "../utlis/datauri.js";
import cloudinary from "../utlis/cloudinary.js";

const registerCompany = asyncHandler(async (req, res) => {
  const { companyName, description, website, location } = req.body;

  if (!companyName) {
    throw new ApiError(400, "companyName is required ");
  }

  const existed = await Company.findOne({ companyName });

  if (existed) {
    throw new ApiError(400, "comapany is already registed");
  }

  const company = await Company.create({
    companyName,
    description,
    website,
    location,
    userId: req.id,
  });

  if (!company) {
    throw new ApiError(400, "something went wrong while register company");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, "successfully registed company"));
});

const getCompany = asyncHandler(async (req, res) => {
  const userId = req.id;

  if (!userId) {
    throw new ApiError(400, "userId not find");
  }

  const company = await Company.find({ userId });

  if (!company) {
    throw new ApiError(400, "company not find");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, "company find successfully"));
});

const getCompanyById = asyncHandler(async (req, res) => {
  const companyId = req.params.id;

  if (!isValidObjectId(companyId)) {
    throw new ApiError(400, "companyid is required");
  }

  const company = await Company.findById(companyId);

  if (!company) {
    throw new ApiError(400, "company is not found ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, "company find successfully"));
});

const updateCompany = asyncHandler(async (req, res) => {
  const { companyName, description, location, website } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  const logo = cloudResponse.secure_url;

  const updatedata = { companyName, description, website, location, logo };

  const company = await Company.findByIdAndUpdate(req.params.id, updatedata, {
    new: true,
  });

  if (!company) {
    throw new ApiError(400, "company is ot found ");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, company, "company details updated successfullly")
    );
});

export { registerCompany, getCompany, getCompanyById, updateCompany };
