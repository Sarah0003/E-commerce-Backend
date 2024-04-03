import { AppError } from "../utils/AppError.js";

export const validation= (schema)=>{
return(req,res,next)=>{
  let filters = {};
    
  // Construct filters object based on request data
  
  if (req.file ) {
    filters = { image: req.file , ...req.body, ...req.params, ...req.query };
  }else if(req.files){
    filters = { ...req.files , ...req.body, ...req.params, ...req.query };
  }
  else {
    filters = { ...req.body, ...req.params, ...req.query };
  }

  // Validate the filters object against the provided schema
  const { error } = schema.validate(filters, { abortEarly: false });
  
  if (!error) {
    // If there is no validation error, proceed to the next middleware
    next();
  } else {
    // If there are validation errors, construct an array of error messages
    let errorList = []
    error.details.forEach(val => {
      errorList.push(val.message)
    });
    
    // Pass the error to the error handling middleware
    next(new AppError(errorList, 401));
    }
  }
}