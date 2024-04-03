import subCategoryModel from "../../../../Database/models/subCatergory.model.js"
import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";


const addSubCategory=handleError( async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);
  req.body.image=req.file.filename;
  let doc=new subCategoryModel(req.body);
  let addedCategory=await doc.save();
  res.json({message:"subCategories added",addedCategory})
 })

 const getAllSubCategories=handleError( async(req,res,next)=>{
  console.log(req.params);
  let filterObj={};
  if(req.params.category){
    filterObj.category=req.params.category
  }
  let allSubCategories=await subCategoryModel.find(filterObj);
  res.json({message:"Show all subCategories",allSubCategories})
 })

 const getSubCategoriesById=handleError(async(req,res,next)=>{
  let subCategories=await subCategoryModel.findById(req.params.id);
  subCategories &&   res.json({message:"Show subCategories by Id",subCategories})

  !subCategories &&  res.json({message:"subCategories not found"})  
 })

 const updateSubCategory=handleError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);

  let updatedSubCategory=await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

  updatedSubCategory &&   res.json({message:"subCategories Been Updatd",updatedSubCategory})

  !updatedSubCategory &&  res.json({message:"subCategories not found"})

})
const deleteSubCategory=deleteOne(subCategoryModel)

export{
  addSubCategory,getAllSubCategories,getSubCategoriesById,updateSubCategory,deleteSubCategory
}