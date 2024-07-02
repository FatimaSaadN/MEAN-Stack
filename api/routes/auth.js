import express from 'express';
import { login, register, registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

//register
router.post('/register', register)

//login
router.post('/login', login)

//register as afdmin
router.post('/register-admin', registerAdmin)


export default router;