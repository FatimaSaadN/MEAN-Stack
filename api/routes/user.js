//import express
import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { updateRole } from '../controllers/role.controller.js';
//const router
const router = express.Router();
//get all 
router.get('/', verifyAdmin, getAllUsers);
//get by id
router.get('/:id', verifyUser ,getUserById)
//update user
router.put('/:id', updateUser);

export default router;
