
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../../../../Database/models/user.model.js";
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";



export const signUp=handleError(
  async(req,res,next)=>{
      // let {name,email,password}=req.body;
      let isFound=await userModel.findOne({email:req.body.email});
      if(isFound) next (new AppError("Email already exists",409))
      let user =new userModel(req.body);
    //save hash password automatically 
      await user.save();
      res.json({message:"Signed up successfully",user})
  })
  
  
  export const signIn=handleError(async(req,res,next)=>{
      let {email,password}=req.body;
      let isFound=await userModel.findOne({email});
      let match= bcrypt.compareSync(password,isFound.password);

      if(isFound && match){
          let token=jwt.sign({name:isFound.name,userId:isFound._id,role:isFound.role},process.env.SECRET_KEY);
          res.json({message:"Signed in successfully",token});
        }

      next(new AppError("Incorrect email or password",401))
    });
  
    export const protectedRoute=handleError(async(req,res,next)=>{
      let {token}=req.headers;
      if(!token) return next(new AppError("Please,provide token",401))
      
      let decoded =await jwt.verify(token,process.env.SECRET_KEY);

      let user=await userModel.findById(decoded.userId);
      if(!user) return next(new AppError("Invalid user",404));

      if(user.changePasswordAt){
            let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
            console.log(changePasswordTime ,"=======>",decoded.iat);
          
            if(changePasswordTime>decoded.iat) return next(new AppError("Token invalid change password",401))
      }
      req.user=user;
      next();
    })
  
    export const allowTo=(...roles)=>{
     return handleError(async(req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new AppError("Not authorized",403))
        next()
        // console.log(roles,req.user);
      });
    }