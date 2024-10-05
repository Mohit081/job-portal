import { asyncHandler } from "../utlis/asyncHandler.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { query } from "express";
import { isValidObjectId } from "mongoose"; 

const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
  } = req.body;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId
  ) {
    throw new ApiError(400, "fill all the fields");
  }

  const userId = req.id;

  if (!userId) {
    throw new ApiError(400, "something went wrong ");
  }

  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","), 
    salary: Number(salary),
    location,
    jobType,
    experience,
    position,
    companyId: companyId,
    created_By: userId,
  });

  if (!job) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "job created successfully"));
});

const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  };

  const jobs = await Job.find(query)
    .populate({
      path: "companyId",
    })
    .sort({ createdAt: -1 });

  if (!jobs) {
    throw new ApiError(400, "jobs not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "jobs find successfully"));
});

const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  if (!isValidObjectId(jobId)) {
    throw new ApiError(400, "jobId is required");
  }

  const job = await Job.findById(jobId).populate({
    path: "application"
  });

  if (!job) {
    throw new ApiError(400, "job not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "job found successfully"));
});

const getAdminJob = asyncHandler(async (req, res) => {
  const adminId = req.id;

  if (!adminId) {
    throw new ApiError(400, "something went wrong");
  }

  const jobs = await Job.find({ created_By: adminId }).populate({
    path: "companyId",
  });

  if (!jobs) {
    throw new ApiError(400, "jobs not found"); 
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "jobs found successfully"));
});

export { postJob, getAdminJob, getAllJobs, getJobById };
