import { asyncHandler } from "../utlis/asyncHandler";
import { ApiError } from "../utlis/ApiError";
import { ApiResponse } from "../utlis/ApiResponse";
import { Job } from "../models/job.model";
import { query } from "express";
import { isValidObjectId } from "mongoose";

const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    descripition,
    requirement,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
  } = req.body;

  if (
    !title ||
    !descripition ||
    !requirement ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId
  ) {
    throw new ApiError(400, "fill all the fields");
  }

  const job = await Job.create({
    title,
    descripition,
    requirement: requirement.split(","),
    salary: Number(salary),
    location,
    jobType,
    experience,
    position,
    comapny: companyId,
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
      { descripition: { $regex: keyword, $options: "i" } },
    ],
  };

  const jobs = await Job.find(query)
    .populate({
      path: "Company",
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

  const job = await Job.findById(jobId);

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

  const jobs = await Job.find({ created_by: adminId }).populate({
    path: "Company",
    createdAt: -1,
  });

  if (!jobs) {
    throw new ApiError(400, "jobs not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "jobs found successfully"));
});
