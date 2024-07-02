//import express
import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
//const router
const router = express.Router();
//get all 
router.get('/', verifyAdmin, getAllUsers);
//get by id
router.get('/:id', verifyUser ,getUserById)

export default router;
