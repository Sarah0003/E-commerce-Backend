import mongoose, { model } from 'mongoose';

const reviewsSchema=new mongoose.Schema({
  comment:{
    type:String,
    required:[true,'Review comment required'],
    trim:true,
  },

  product:{
    type:mongoose.Types.ObjectId,
    ref:"Product"
  },
  
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  rating:{
    type:Number,
    min:1,
    max:5
  },
},{
  timestamps:true
});


reviewsSchema.pre(/^find/,function(){
  this.populate("user","name");
})

const reviewsModel=model("Reviews",reviewsSchema);

export default reviewsModel;

