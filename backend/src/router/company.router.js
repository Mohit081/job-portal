import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = Router();

router.route("/").post(verifyJWT, registerCompany);
router.route("/getcompany").get(verifyJWT, getCompany);
router.route("/getcompany/:id").get(getCompanyById);
router.route("/update/:id").post(verifyJWT, updateCompany);

export default router;  


