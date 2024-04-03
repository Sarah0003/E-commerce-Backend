import express from 'express';
import { addSubCategory, getAllSubCategories, getSubCategoriesById, updateSubCategory ,deleteSubCategory} from './controller/subCategory.controller.js';
import { validation } from '../../middleware/validation.js';
import { getByIdSchema, updateSubCaTegorySchema,addSubCaTegorySchema } from './controller/subCategory.validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';

const subCategoryRoutes=express.Router({mergeParams:true});

subCategoryRoutes.route("/")
.post(uploadSingle('image'),validation(addSubCaTegorySchema),addSubCategory)
.get(getAllSubCategories);
subCategoryRoutes.route("/:id")
.get(validation(getByIdSchema),getSubCategoriesById)
.patch(validation(updateSubCaTegorySchema),updateSubCategory)
.delete(deleteSubCategory);

export default subCategoryRoutes;
