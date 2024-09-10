import {asyncHandler} from "../utlis/asyncHandler.js";
import {ApiError} from "../utlis/ApiError.js";
import {ApiResponse} from "../utlis/ApiResponse.js";
import {Company} from "../models/company.model.js";
import { isValidObjectId } from "mongoose";

const registerCompany = asyncHandler(async (req, res) => {
  const { companyName, descripition, website, location } = req.body;

  if (!companyName) {
    throw new ApiError(400, "companyName is required ");
  }

  const existed = await Company.findOne({ companyName });

  if (existed) {
    throw new ApiError(400, "comapany is already registed");
  }

  const company = await Company.create({
    companyName,
    if(descripition) {
      descripition;
    },
    if(website) {
      website;
    },
    if(loation) {
      location;
    },
    userId: req.id,
  });

  if(!company) {
     throw new ApiError(400 , "something went wrong while register company")
  }

  return res
  .status(200)
  .josn (new ApiResponse(200 , company , "successfully registed company"))
});

const getCompany = asyncHandler(async (req,res) => {
    const userId = req.id

    if(!userId) {
        throw new ApiError(400 , "userId not find")
    }

    const company = await Company.findOne({userId})

    if(!company) {
        throw new ApiError(400 , "company not find")
    }

    return res
    .status(200)
    .json(200 , company , "company find successfully")
})

const getCompanyById = asyncHandler(async (req,res) => {
    const companyId = req.params.id

    if(!isValidObjectId(companyId)) {
        throw new ApiError(400 , "companyid is required")
    }

    const company = await Company.findById(companyId)

    if(!company) {
        throw new ApiError(400 , "company is not found ")
    }

    return res.
    status(200)
    .json (new ApiResponse(200 , company , "company find successfully"))
})

const updateCompany = asyncHandler(async (req, res) => {
    const {name , descripition , location , website} = req.body

    const updatedata = {name , descripition , website , location}

    const company =  await Company.findByIdAndUpdate(
        req.params.id,
        updateCompany,
        {
            new:true
        }
    )

    if(!company) {
        throw new ApiError(400 , "company is ot found ")
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , company , "company details updated successfullly"))
}) 
 
export {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
}