import mongoose, { model } from 'mongoose';

const categorySchema=new mongoose.Schema({
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
  image:String,
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true
});

categorySchema.post("init",function(doc){
  doc.image=process.env.BASE_URL+ 'uploads/' +doc.image
})

const categoryModel=model("Category",categorySchema);

export default categoryModel;




