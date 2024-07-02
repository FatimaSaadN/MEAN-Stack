//import role.js from models
import Role from '../models/Role.js';
//create logic
export const createRole = async (req, res, next) =>{

    try{
        if(req.body.role && req.body.role != ''){
            const newRole = new Role(req.body); 
            await newRole.save();
            //get id
            const roleId = newRole._id;
            //display id
            console.log(roleId);
            //return id
            res.json({message: 'Role created successfully', roleId: roleId});
            //return res.send("Role Created!")
        } else {
            return res.status(400).send("Bad Request")
        }
    }catch(error){
        return res.status(500).send("Internal Server Error!")
    }
};

//update logic
export const updateRole = async (req, res, next)=>{

    try {
        //find role
        const role = await Role.findById(req.params.id);
        if(role){
            //new data await 
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
    
            return res.send("Role Updated!");
        } else {
            return res.status(400).send("Bad Request - Role not found!")
        }
    } catch(error) {
        return res.status(500).send("Internal Server Error!")
    }
};

//get all roles
export const getAllRoles = async (req, res, next)=>{
    try{
        const roles = await Role.find({});
        //return using status 200
        return res.status(200).send(roles);
    } catch(error){
        return res.status(500).send("Internal Server Error!")
    }
};

//delete roll 
export const deleteRole = async (req, res, next)=>{
    try{
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId})
        if(role){
            await Role.findByIdAndDelete(roleId)
            return res.status(200).send("Role Deleted");
        } else {
            return res.status(400).send("Bad Request - Role not found!")
        }
    } catch(error){
        return res.status(500).send("Internal Server Error!")
    }
};