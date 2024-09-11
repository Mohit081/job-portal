import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = Router();

router.route("/").post(verifyJWT, postJob);
router.route("/get").get(verifyJWT, getAllJobs);
router.route("/getadminjobs").get(verifyJWT, getAdminJob);
router.route("/get/:id").get(verifyJWT, getJobById);

export default router;
