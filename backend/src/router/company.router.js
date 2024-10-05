import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, registerCompany);
router.route("/getcompany").get(verifyJWT, getCompany);
router.route("/getcompany/:id").get(verifyJWT,getCompanyById);
router.route("/update/:id").put(verifyJWT,upload, updateCompany);

export default router;  


