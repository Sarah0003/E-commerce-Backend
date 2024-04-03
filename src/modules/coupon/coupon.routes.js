import express from 'express';
import * as couponController from './controller/coupon.controller.js';
import { protectedRoute } from '../auth/controller/auth.controller.js';




const couponRoutes=express.Router();

couponRoutes.route("/")
  .post(protectedRoute,couponController.addCoupon)
  .get(couponController.getAllCoupons);

  couponRoutes.route("/:id")
  .get(couponController.getCouponById)
  .patch(protectedRoute,couponController.updateCoupons)
  .delete(couponController.deleteCoupons);

export default couponRoutes;
