export { Router } from "express";
import {
  applyJob,
  getApplicants,
  getAppliedjobs,
  updateStatus,
} from "../controllers/application.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, applyJob);
router.route("/appliedjobs").post(verifyJWT, getAppliedjobs);
router.route("/getapplicants/:id").post(verifyJWT, getApplicants);
router.route("/update/status/:id").post(verifyJWT, updateStatus);

export default router;
