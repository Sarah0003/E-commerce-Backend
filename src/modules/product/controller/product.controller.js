import productModel from "../../../../Database/models/product.model.js"
import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";




const addProduct=handleError(async(req,res,next)=>{
  // console.log(req.files);
  req.body.slug=slugify(req.body.title);
  req.body.imageCover=req.files.imageCover[0].filename;
  req.body.images=req.files.images.map(ele => ele.filename)
  let preProduct = new productModel(req.body);
  let addedProduct=await preProduct.save();
  res.json({message:"Product added",addedProduct});
});

const getAllProducts=handleError(async(req,res,next)=>{

let apiFeature=new ApiFeatures(productModel.find(),req.query).pagination().sort().search().fields();
//Execute query

  let allProducts=await apiFeature.mongooseQuery;
  res.json({message:"Show all Products",page:apiFeature.page,allProducts});
});




 const getProductById=handleError(async(req,res,next)=>{
  let product=await productModel.findById(req.params.id);
  product &&   res.json({message:"Show Product by Id",product})
  !product &&  res.json({message:"Product not found"})   
 });



 const updateProduct=handleError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title);
  if(req.files.imageCover) req.body.imageCover= req.files.imageCover[0].filename;
  if(req.files.images) req.body.images= req.files.images.map(ele => ele.filename);

  let updatedProduct=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
  updatedProduct &&   res.json({message:"product Been Updatd",updatedProduct});
  !updatedProduct &&  res.json({message:"product not found"});
});


const deleteProduct=deleteOne(productModel)


export{
  addProduct,getAllProducts,getProductById,updateProduct,deleteProduct
}