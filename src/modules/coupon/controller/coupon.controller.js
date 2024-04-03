import couponModel from "../../../../Database/models/coupon.model.js"
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import QRCode from 'qrcode';

const addCoupon=handleError(async(req,res,next)=>{
  
  let preCoupon = new couponModel(req.body);
  let addedCoupon=await preCoupon.save();
  res.json({message:"Coupon added",addedCoupon});
});

const getAllCoupons=handleError(async(req,res,next)=>{
  let apiFeature=new ApiFeatures(couponModel.find(),req.query).pagination().sort().search().fields();
  let getCoupons=await apiFeature.mongooseQuery;
  res.json({message:"Show all Coupons",getCoupons});
});

const getCouponById=handleError(async(req,res,next)=>{
  let {id}=req.params;
  let Coupon=await couponModel.findOne({_id:id});
  let url= await QRCode.toDataURL(Coupon.code);
  res.json({message:"Show Coupon by Id",Coupon,url});
});

const updateCoupons=handleError(async(req,res,next)=>{
  let {id}=req.params;
  let updatedCoupons=await couponModel.findOneAndUpdate({_id:id},req.body,{new:true});
  updatedCoupons  &&  res.json({message:"Coupon Been Updatd",updatedCoupons});
  !updatedCoupons &&  res.json({message:"Coupon not found"});
});

const deleteCoupons=deleteOne(couponModel);

export{
  addCoupon,getAllCoupons,getCouponById,updateCoupons,deleteCoupons
}


