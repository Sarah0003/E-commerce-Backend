import express from 'express';
import * as orderController from './controller/order.controller.js';
import { protectedRoute } from '../auth/controller/auth.controller.js';




const orderRoutes=express.Router();

orderRoutes.route("/:id").post(protectedRoute,orderController.createOrder)
orderRoutes.route("/").get(protectedRoute,orderController.getOrder);
orderRoutes.route("/getAllOrders").get(protectedRoute,orderController.getAllOrders);
orderRoutes.route("/checkout/:id").post(protectedRoute,orderController.onlinePayment)
orderRoutes.post('/webhook', express.raw({type: 'application/json'}),orderController.createOnlineOrder)
  
export default orderRoutes;
