import express from 'express';
import * as wishListController from './controller/wishList.controller.js';
import { protectedRoute } from '../auth/controller/auth.controller.js';




const wishListRoutes=express.Router();

wishListRoutes.patch("/",protectedRoute,wishListController.addToWishList)
wishListRoutes.delete("/",protectedRoute,wishListController.removeFromWishList)
wishListRoutes.get("/",protectedRoute,wishListController.getAllWishList)


export default wishListRoutes;
