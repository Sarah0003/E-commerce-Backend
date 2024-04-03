import reviewsModel from "../../../../Database/models/reviews.model.js"
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

const addReview=handleError(async(req,res,next)=>{
  req.body.user=req.user._id;
  let isReview=await reviewsModel.findOne({user:req.user._id,product:req.body.product})
  if(isReview) return next(new AppError("Review already exists",409))
  let preReview = new reviewsModel(req.body);
  let addedReview=await preReview.save();
  res.json({message:"Review added",addedReview});
});

const getAllReviews=handleError(async(req,res,next)=>{
  let apiFeature=new ApiFeatures(reviewsModel.find(),req.query).pagination().sort().search().fields();
  let getReviews=await apiFeature.mongooseQuery;
  res.json({message:"Show all reviews",getReviews});
});

const getReviewById=handleError(async(req,res,next)=>{
  let {id}=req.params;
  let review=await reviewsModel.findOne({_id:id});
  review  &&  res.json({message:"Show review by Id",review});
  !review &&  res.json({message:"Review not found"});   
});

const updateReviews=handleError(async(req,res,next)=>{
  let {id}=req.params;
  req.body.user=req.user._id;
  let updatedReviews=await reviewsModel.findOneAndUpdate({_id:id , user: req.user._id},req.body,{new:true});
  updatedReviews  &&  res.json({message:"Review Been Updatd",updatedReviews});
  !updatedReviews &&  res.json({message:"Review not found"});
});

const deleteReviews=deleteOne(reviewsModel);

export{
  addReview,getAllReviews,getReviewById,updateReviews,deleteReviews
}


