import brandsModel from "../../../../Database/models/brands.model.js"
import slugify from "slugify";
import { deleteOne } from "../../handlers/apiHandler.js";

import ApiFeatures from "../../../utils/APIFeatures.js";
import { handleError } from "../../../middleware/handleError.js";



const addBrand=handleError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);
  req.body.logo=req.file.filename;
  let preBrand = new brandsModel(req.body);
  let addedBrand=await preBrand.save();
  res.json({message:"Brand added",addedBrand});
});




const getAllBrands=handleError(async(req,res,next)=>{
  let apiFeature=new ApiFeatures(brandsModel.find(),req.query).pagination().sort().search().fields();
  let getBrands=await apiFeature.mongooseQuery;
  res.json({message:"Show all brands",getBrands});
});



 const getBrandById=handleError(async(req,res,next)=>{
  let brand=await brandsModel.findById(req.params.id);
  brand &&   res.json({message:"Show brand by Id",brand})
  !brand &&  res.json({message:"brand not found"})   
 });



 const updateBrands=handleError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);
  if(req.body.file) req.body.logo=req.file.filename;
  let updatedBrands=await brandsModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
  updatedBrands &&   res.json({message:"brand Been Updatd",updatedBrands});
  !updatedBrands &&  res.json({message:"brand not found"});
});


const deleteBrands=deleteOne(brandsModel)


export{
  addBrand,getAllBrands,getBrandById,updateBrands,deleteBrands
}