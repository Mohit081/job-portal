import { Router } from "express";
import {
  profileupdate,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/").post(upload, userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/profile/update").post(verifyJWT, upload, profileupdate);

export default router;
