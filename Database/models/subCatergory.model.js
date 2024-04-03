import mongoose, { model } from 'mongoose';

const subCategorySchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minLength:[3,"Min length is 3 letters"],
    maxLength:[30,"Max length is 30 letters"],
    trim:true,
    unique:true
  },
  slug:{
    type:String,
    required:true,
    lowercase:true
  },
  category:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  image:String
},{
  timestamps:true
});
subCategorySchema.post("init",function(doc){
  doc.image=process.env.BASE_URL+ 'uploads/' +doc.image
})
const subCategoryModel=model("SubCategory",subCategorySchema);

export default subCategoryModel;




