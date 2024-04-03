import mongoose, { model } from 'mongoose';

const productSchema=new mongoose.Schema({
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
  description:{
    type:String,
    minLength:[3,"Min length is 3 letters"],
    maxLength:[300,"Max length is 300 letters"],
    required:true,
  },
  price:{
    type:Number,
    min:0,
    required:true,
  },
  priceAfterDiscount:{
    type:Number,
    min:0,
    required:true,
  },
  category:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
  },
  subCategory:{
    type:mongoose.Types.ObjectId,
    ref:"SubCategory"
  },
  brand:{
    type:mongoose.Types.ObjectId,
    ref:"Brand"
  },
  imageCover:String,
  images:[String],
  sold:{
    type:Number,
    required:true,
    default:0
  },
  quantity:{
    type:Number,
    required:true,
    default:0
  },
  rateCount:Number,
  rateAvg:{
    type:Number,
    min:0,
    max:5
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
productSchema.post("init",function(doc){

  doc.imageCover=process.env.BASE_URL+ 'uploads/' +doc.imageCover;
  if(doc.images)doc.images.map(ele=>process.env.BASE_URL+ 'uploads/' +ele);
})

productSchema.virtual('myReview', {
  ref: 'Reviews',
  localField: '_id',
  foreignField: 'product'
});

productSchema.pre(/^find/,function(){
  this.populate("myReview")
})

const productModel=model("Product",productSchema);

export default productModel;




