import express from 'express';
import { addCategory, getAllCategories, getCategoriesById, updateCategory ,deleteCategory} from './controller/category.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCaTegorySchema, getByIdSchema, updateCaTegorySchema } from './controller/category.validation.js';

import { uploadSingle } from '../../utils/fileUpload.js';
import subCategoryRoutes from '../subCategory/subCategory.routes.js';

const categoryRoutes=express.Router();

//Get all subcategories of specific category
categoryRoutes.use("/:category/subcategory",subCategoryRoutes)

categoryRoutes.route("/")
.post(uploadSingle('image'),validation(addCaTegorySchema),addCategory)

.get(getAllCategories);
categoryRoutes.route("/:id").get(validation(getByIdSchema),getCategoriesById)
.patch(validation(updateCaTegorySchema),updateCategory).delete(deleteCategory);

export default categoryRoutes;
