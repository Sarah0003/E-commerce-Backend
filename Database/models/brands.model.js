import mongoose, { model } from 'mongoose';

const brandsSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minLength:[3,"Min length is 3 letters"],
    maxLength:[30,"Max length is 30 letters"],
    trim:true,
    unique:true
  },
  logo:String,
  slug:{
    type:String,
    required:true,
    lowercase:true
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true
});

brandsSchema.post("init",function(doc){
  doc.logo=process.env.BASE_URL+ 'uploads/' +doc.logo
})


const brandsModel=model("Brand",brandsSchema);

export default brandsModel;




