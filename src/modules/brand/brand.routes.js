import express from 'express';
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';
import { addBrand, deleteBrands, getAllBrands, getBrandById, updateBrands } from './controller/brand.controller.js';
import { addBrandSchema, getByIdSchema, updateBrandSchema } from './controller/brand.validation.js';




const brandRoutes=express.Router();

brandRoutes.route("/")
  .post(uploadSingle('image'),validation(addBrandSchema),addBrand)
  .get(getAllBrands);

brandRoutes.route("/:id")
  .get(validation(getByIdSchema),getBrandById)
  .patch(validation(updateBrandSchema),updateBrands)
  .delete(deleteBrands);

export default brandRoutes;
