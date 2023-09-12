import express from "express";
import { register, login, homepage } from "../controller/loginController.js";
import { userRegisterData, userLoginData, verifyToken } from '../middleware/loginMiddlware.js'
const router = express.Router()

router.post('/register', userRegisterData, register);
router.post('/login', userLoginData, login);
router.post('/home', verifyToken, homepage)


export default router;