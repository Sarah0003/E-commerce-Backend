import orderModel from "../../../../Database/models/order.model.js"
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeatures from "../../../utils/APIFeatures.js";
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import productModel from "../../../../Database/models/product.model.js"
import cartModel from "../../../../Database/models/cart.model.js"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import express from 'express'





const createOrder=handleError(async(req,res,next)=>{
 // 1- Get cart id
  let cart = await cartModel.findById(req.params.id);
 
 // 2- Get either totalPriceAfterDiscount or totalPrice
  let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  
  // 3- Create order
  let order=new orderModel({
    user:req.user._id,
    cartItems:cart.cartItems,
    totalPrice,
    shippingAddress:req.body.shippingAddress
  })

// 4- Update sold quantity

  if(order){
    let options=cart.cartItems.map(item=>(
      {
        updateOne :{
          "filter": {_id:item.product},
          "update": {$inc:{quantity:-item.quantity,sold:item.quantity}},            // Changed in 4.2
        }    
      }))
      await productModel.bulkWrite(options);
      await order.save();

  }else{
    return next(new AppError("Error",409))
  }

// 5- Remove cart

await cartModel.findByIdAndDelete(req.params.id);
res.json({message:"Done",order})
});

const getOrder=handleError(async(req,res,next)=>{
  // 1- Get cart id
  let order = await orderModel.findOne({user:req.user._id}).populate("cartItems.product");
  res.json({message:"Get order by user",order})
});

const getAllOrders=handleError(async(req,res,next)=>{
  // 1- Get cart id
  let order = await orderModel.find({user:req.user._id});
  res.json({message:"Done",order})
});

const onlinePayment=handleError(async(req,res,next)=>{
  let cart = await cartModel.findById(req.params.id); 
  let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  
  let session=await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:'egp',
          unit_amount:totalPrice*100,
          product_data:{
            name:req.user.name,
          },
        },
      quantity:1,
      },
    ],
    mode:"payment",
    success_url:"http://localhost:4200/en",
    cancel_url:"http://localhost:4200/en/404",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress
  });
  res.json({message:"Payment success",session})
});






const createOnlineOrder=handleError(async(req,res,next)=>{
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, "whsec_BZIL43jW6vaXYuVFjuxB1WQRsxZophYj");
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if(event.type == "checkout.session.completed"){
      const e = event.data.object;
      // 3- Create order
      let cart=await cartModel.findById(e.client_reference_id)
      if(!cart) next(new AppError("Invalid cart id",400));
      // let user=await userModel.findOne({email:e.customer_email})
      // if(!user) next(new AppError("Invalid user id",400));


      let order=new orderModel({
        user:e.customer_email,
        cartItems:cart.cartItems,
        totalPrice:e.amount_total/100,
        shippingAddress:e.metadata,
        paymentMethod:'card',
        isPaid:true,
        paidAt:Date.now()
      });
      await order.save();
      let options=cart.cartItems.map(item=>(
        {
          updateOne :{
            "filter": {_id:item.product},
            "update": {$inc:{quantity:-item.quantity,sold:item.quantity}},            // Changed in 4.2
          }    
        }))
        await productModel.bulkWrite(options);
        await order.save();


      //Clear cart
      await cartModel.findByIdAndDelete(req.params.id)
    }else{
      console.log(`Unhandled event type ${event.type}`);
    }
      res.json({message:"Done"});
  });
  
export{
  createOrder,getOrder,getAllOrders,onlinePayment,createOnlineOrder
}

