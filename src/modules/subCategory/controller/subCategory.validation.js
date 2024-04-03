import Joi from 'joi';

export const addSubCaTegorySchema=Joi.object({
  title:Joi.string().min(3).max(20),
  category:Joi.string().hex().length(24).required(),
    image:Joi.object({
    
    fieldname:Joi.string(),
    originalname: Joi.string(),
    encoding:Joi.string(),
    mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg'),
    destination:Joi.string(),
    filename:Joi.string(),
    path:Joi.string(),
    size:Joi.number().max(5242880),

  })
})


export const getByIdSchema=Joi.object({
  id:Joi.string().hex().length(24).required()
})

export const updateSubCaTegorySchema=Joi.object({
  id:Joi.string().hex().length(24).required(),
  title:Joi.string().min(3).max(20).required()
})


