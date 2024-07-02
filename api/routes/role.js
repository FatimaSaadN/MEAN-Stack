import express from "express";
import Role from '../models/Role.js'
import { createRole } from "../controllers/role.controller.js";
import { updateRole } from "../controllers/role.controller.js";
import { getAllRoles } from "../controllers/role.controller.js";
import { deleteRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//create a new role in DB
router.post('/create', verifyAdmin, createRole);
router.put('/update/:id', verifyAdmin , updateRole);

//get all roles from DB
router.get('/getAll', getAllRoles);

//delete roll fetch
router.delete('/deleteRole/:id', deleteRole);


export default router;