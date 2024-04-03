import mongoose, { model } from 'mongoose';

const cartSchema=new mongoose.Schema({
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  cartItems:[{
    product:{
      type:mongoose.Types.ObjectId,
      ref:"Product"  
    },
    quantity:{
      type:Number,
      default:1  
    },
    price:Number
  }],
  totalPrice:Number,
  discount:Number,
  totalPriceAfterDiscount:Number
},{
  timestamps:true
});



const cartModel=model("cart",cartSchema);

export default cartModel;




