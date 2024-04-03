import userModel from "../../../../Database/models/user.model.js"
import slugify from "slugify";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";



const addUser=handleError(async(req,res,next)=>{
  let user = await userModel.findOne({email:req.body.email}) ;
  if (user) return next(new AppError("Email already exists",409))
    let preUser = new userModel(req.body);
    let addedUser=await preUser.save();
    res.json({message:"User added",addedUser});
}
);

const getAllUsers=handleError(async(req,res,next)=>{
  let apiFeature=new ApiFeatures(userModel.find(),req.query).pagination().sort().search().fields();
  let getUsers=await apiFeature.mongooseQuery;
  res.json({message:"Show all Users",getUsers});
});



 const getUserById=handleError(async(req,res,next)=>{
  let User=await userModel.findById(req.params.id);
  User &&   res.json({message:"Show User by Id",User})
  !User &&  res.json({message:"User not found"})   
 });



 const updateUser=handleError(async(req,res,next)=>{
  let {id}=req.params;
  let updatedUser=await userModel.findByIdAndUpdate(id,req.body,{new:true});
  !updateUser && next(new AppError("not found user",404))
  updatedUser && res.json({message:"User been updatd",updatedUser});
});


const deleteUser=deleteOne(userModel)


const changePassword=handleError(async(req,res,next)=>{
  let {id}=req.params;
  req.body.changePasswordAt=Date.now();
  console.log(req.body.changePasswordAt);

  let changedPassword=await userModel.findOneAndUpdate({_id:id},req.body,{new:true});
  !changedPassword && next(new AppError("not found user",404))
  changedPassword && res.json({message:"Password been updated",changedPassword});
});




export{
  addUser,getAllUsers,getUserById,updateUser,deleteUser,changePassword
}