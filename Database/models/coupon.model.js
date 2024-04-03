import mongoose, { model } from 'mongoose';

const couponSchema=new mongoose.Schema({
  code:{
    type:String,
    required:[true,'Coupun code required'],
    trim:true,
    unique:true
  },
  discount:{
    type:Number,
    min:0,
    required:[true,'Coupun code required']
  },
  expires:{
  type:Date,
  required:[true,'Coupun code required']
}
  
},{
  timestamps:true
});

const couponModel=model("Coupon",couponSchema);

export default couponModel;




