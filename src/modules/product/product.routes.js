import express from 'express';
import { validation } from '../../middleware/validation.js';
import { uploadFields, uploadSingle } from '../../utils/fileUpload.js';
import { addProductSchema, getByIdSchema, updateProductSchema } from './controller/product.validation.js';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './controller/product.controller.js';
import { allowTo, protectedRoute } from '../auth/controller/auth.controller.js';




const productRoutes=express.Router();

productRoutes.route("/")
  .post(protectedRoute,
    allowTo("User","Admin"),
    uploadFields([{name:"imageCover" ,maxCount:1},{name:"images",maxCount:10}]),validation(addProductSchema),addProduct)
  .get(getAllProducts);

  productRoutes.route("/:id")
  .get(validation(getByIdSchema),getProductById)
  .patch(uploadFields([{name:"imageCover" ,maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
  .delete(deleteProduct);

export default productRoutes;
