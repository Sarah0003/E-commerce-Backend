import categoryModel from "../../../../Database/models/catergory.model.js"
import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";


const addCategory=handleError( async(req,res,next)=>{
  console.log(req.file);
  req.body.slug=slugify(req.body.title);
  req.body.image=req.file.filename;
  let doc=new categoryModel(req.body);
  let addedCategory=await doc.save();
  res.json({message:"Cat added",addedCategory})
 })

 const getAllCategories=handleError( async(req,res,next)=>{
  
let apiFeature=new ApiFeatures(categoryModel.find(),req.query).pagination().sort().search().fields();
//Execute query
  let allCategories=await apiFeature.mongooseQuery;
  res.json({message:"Show all categories",page:apiFeature.page,allCategories})
 })

 const getCategoriesById=handleError(async(req,res,next)=>{
  let categories=await categoryModel.findById(req.params.id);
  categories &&   res.json({message:"Show Categories by Id",categories})

  !categories &&  res.json({message:"Categories not found"})   
})

 const updateCategory=handleError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);

  let updatedCategory=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

  updatedCategory &&   res.json({message:"Category Been Updatd",updatedCategory})

  !updatedCategory &&  res.json({message:"Category not found"})

})


const deleteCategory=deleteOne(categoryModel)

export{
  addCategory,getAllCategories,getCategoriesById,updateCategory,deleteCategory
}