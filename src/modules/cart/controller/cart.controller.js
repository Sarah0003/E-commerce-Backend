import cartModel from "../../../../Database/models/cart.model.js"
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import productModel from "../../../../Database/models/product.model.js"



function calcPrice(cart){

  let totalPrice=0;
  cart.cartItems.forEach(ele => {
    totalPrice+=ele.quantity*ele.price;
  });
  cart.totalPrice=totalPrice;
 
}







const addCart=handleError(async(req,res,next)=>{
 //Get product price from product db
  let product=await productModel.findById(req.body.product).select("price")
  !product && next(new AppError("Product not found",404))
  //User Id ===> req.user._id
 
  req.body.price=product.price;
  let isCartExist=await cartModel.findOne({user:req.user._id});
 if(!isCartExist){
  let cart=new cartModel({
    user:req.user._id,
    cartItems:[req.body]
  });
  calcPrice(cart);
  await cart.save();
  return res.status(201).json({message:"Cart created",cart})
 }
//check if item exist in the cart and increment it's quantity if i add it again
 let item=isCartExist.cartItems.find((ele)=>(ele.product == req.body.product));
 if(item) {
  item.quantity+=1;
 }else{
  isCartExist.cartItems.push(req.body);
 }

 calcPrice(isCartExist);
 isCartExist.save();
 res.json({message:"Increment item",isCartExist}) 
});




const getCart=handleError(async(req,res,next)=>{
  let cart=await cartModel.findOne({user:req.user._id});
  res.status(201).json({message:"Get cart",cart});
});


const updateCart=handleError(async(req,res,next)=>{
  //Get product price from product db
   let product=await productModel.findById(req.body.product).select("price")
   !product && next(new AppError("Product not found",404))
   //User Id ===> req.user._id
  
   req.body.price=product.price;
   let isCartExist=await cartModel.findOne({user:req.user._id});

 //check if item exist in the cart and increment it's quantity if i add it again
  let item=isCartExist.cartItems.find((ele)=>(ele.product == req.body.product));
  !item && next( new AppError("Item don't exist",404))
  if(item) {
   item.quantity=req.body.quantity;
  }
 
  calcPrice(isCartExist);
  isCartExist.save();
  res.json({message:"Increment item",isCartExist}) 
 });
 

const removeCartItem=handleError(async(req,res,next)=>{
  let cart=await cartModel.findOneAndUpdate({user:req.user._id},
    {
      $pull:
      {
        cartItems:
        {
          _id:req.params.id
        }
      }
    },
    {
      new:true
    }
  );
  res.json({message:"Cart item deleted successfully",cart})

});



export{
  addCart,getCart,updateCart,removeCartItem
}

