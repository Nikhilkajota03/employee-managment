import express from "express";
import { register, login , getUser, VerifyUser} from "../controller/authController.js";
import {requireLogin} from "../middlewares/auth.js"



const router = express.Router();

router.post("/login",  login);
router.post("/register",  register);
router.get("/getUser", requireLogin, getUser);
router.post("/verify",VerifyUser);

export default router;