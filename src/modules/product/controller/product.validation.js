import Joi from 'joi';

export const addProductSchema=Joi.object({
  title:Joi.string().min(3).max(30).trim().required(),
  description:Joi.string().min(3).max(300).required(),
  price:Joi.number().min(0).required(),
  priceAfterDiscount:Joi.number().min(0).required(),
  quantity:Joi.number().min(0).required(),
  sold:Joi.number().min(0).required(),
  category:Joi.string().hex().length(24).required(),
  subCategory:Joi.string().hex().length(24).required(),
  brand:Joi.string().hex().length(24).required(),
  createdBy:Joi.string().hex().length(24).optional(),

  imageCover:Joi.array().items(Joi.object({
    fieldname:Joi.string(),
    originalname: Joi.string(),
    encoding:Joi.string(),
    mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg'),
    destination:Joi.string(),
    filename:Joi.string(),
    path:Joi.string(),
    size:Joi.number().max(5242880)
  }).required()).required(),
    images:Joi.array().items(Joi.object({
    fieldname:Joi.string(),
    originalname: Joi.string(),
    encoding:Joi.string(),
    mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg'),
    destination:Joi.string(),
    filename:Joi.string(),
    path:Joi.string(),
    size:Joi.number().max(5242880)
  }).required()).required()
})



export const getByIdSchema=Joi.object({
  id:Joi.string().hex().length(24).required()
})

export const updateProductSchema=Joi.object({
  id:Joi.string().hex().length(24).required(),
  title:Joi.string().min(3).max(20),
  description:Joi.string().min(3).max(300),
  price:Joi.number().min(0),
  priceAfterDiscount:Joi.number().min(0),
  quantity:Joi.number().min(0),
  category:Joi.string().hex().length(24),
  subCategory:Joi.string().hex().length(24),
  brand:Joi.string().hex().length(24),
  createdBy:Joi.string().hex().length(24).optional(),
  imageCover:Joi.array().items(Joi.object({
    fieldname:Joi.string(),
    originalname: Joi.string(),
    encoding:Joi.string(),
    mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg'),
    destination:Joi.string(),
    filename:Joi.string(),
    path:Joi.string(),
    size:Joi.number().max(5242880)
  }).required()).optional(),
    images:Joi.array().items(Joi.object({
    fieldname:Joi.string(),
    originalname: Joi.string(),
    encoding:Joi.string(),
    mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg'),
    destination:Joi.string(),
    filename:Joi.string(),
    path:Joi.string(),
    size:Joi.number().max(5242880)
  }).required()).optional()
})


