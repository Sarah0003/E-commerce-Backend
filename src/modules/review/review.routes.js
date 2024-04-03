import express from 'express';
import * as reviewController from './controller/review.controller.js';
import { protectedRoute } from '../auth/controller/auth.controller.js';




const reviewRoutes=express.Router();

reviewRoutes.route("/")
  .post(protectedRoute,reviewController.addReview)
  .get(reviewController.getAllReviews);

  reviewRoutes.route("/:id")
  .get(reviewController.getReviewById)
  .patch(protectedRoute,reviewController.updateReviews)
  .delete(reviewController.deleteReviews);

export default reviewRoutes;
