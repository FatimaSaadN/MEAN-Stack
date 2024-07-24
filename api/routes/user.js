//import express
import express from 'express';
import { changePassword, getAllUsers, getUserById, updateUser } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { updateRole } from '../controllers/role.controller.js';
import {searchUsers} from "../controllers/search.controller.js";
//const router
const router = express.Router();
//get all 
// router.get('/', verifyAdmin, getAllUsers);
// //get by id
// router.get('/:id', verifyUser ,getUserById)
// //update user
router.put('/updateUser/:id', updateUser);
//change password
router.put('/change-password/:id', changePassword);
router.get('/search', searchUsers);

export default router;
