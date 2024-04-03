import express from 'express';
import * as cartController from './controller/cart.controller.js';
import { protectedRoute } from '../auth/controller/auth.controller.js';




const cartRoutes=express.Router();

cartRoutes.route("/")
  .post(protectedRoute,cartController.addCart)
  .get(protectedRoute,cartController.getCart);

  cartRoutes.route("/:id")
  .patch(protectedRoute,cartController.updateCart)
  .delete(protectedRoute,cartController.removeCartItem);

export default cartRoutes;
