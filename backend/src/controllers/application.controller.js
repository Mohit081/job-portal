import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

const applyJob = asyncHandler(async (req, res) => {
  const userId = req.id; 

  const jobId = req.params.id;

  if (!jobId) {
    throw new ApiError(400, "job Id is required");
  }

  const existedApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });
  console.log(existedApplication)

  if (existedApplication) {
    throw new ApiError(400, "you have already applied for this job");
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(400, "job not found");
  }

  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.application.push(newApplication._id);
  await job.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newApplication, "job applied successfully")); 
}); 

const getAppliedjobs = asyncHandler(async (req, res) => {
  const userId = req.id;


  const application = await Application.find({applicant: userId})
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "companyId",
        options: { sort: { createdAt: -1 } },
      },
    });

  if (!application) {
    throw new ApiError(400, "application not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, application, "application found successfully"));
});

const getApplicants = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  if (!isValidObjectId(jobId)) {
    throw new ApiError(400, "Enter valid job id ");
  }

  const job = await Job.findById(jobId).populate({
    path: "application",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
      options: { select:"-password -refreshToken"}
    },
  });

  if (!job) {
    throw new ApiError(400, "job not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "find all applicants successfully"));
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "status is reuired");
  }

  const applicationId = req.params.id;

  const application = await Application.findById(applicationId);

  if (!application) {
    throw new ApiError(400, "application not found");
  }

  application.status = status.toLowerCase();
  await application.save();

  return res
    .status(200)
    .json(new ApiResponse(200, application, "status update successfully "));
});

export {
    applyJob,
    getApplicants,
    getAppliedjobs,
    updateStatus
}