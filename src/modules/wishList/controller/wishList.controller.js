import  userModel  from "../../../../Database/models/user.model.js"
import { handleError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";



const addToWishList = handleError(async (req, res, next) => {
      let { product } = req.body;
      console.log(product);
      let results = await userModel.findOneAndUpdate(
          { _id: req.user._id }, // Corrected: Query condition
          { $addToSet: { wishList: product } },
          { new: true }
      );
      if (!results) {
          return next(new AppError("Not found", 404));
      }
      res.json({ message: "Done", results }); // Sending response directly
  });


  const removeFromWishList = handleError(async (req, res, next) => {
        let { product } = req.body;
        console.log(product);
        let results = await userModel.findOneAndUpdate(
            { _id: req.user._id }, // Corrected: Query condition
            { $pull: { wishList: product } },
            { new: true }
        );
        if (!results) {
            return next(new AppError("Not found", 404));
        }
        res.json({ message: "Done", results }); // Sending response directly
});

const getAllWishList = handleError(async (req, res, next) => {
        let results = await userModel.findOne({ _id: req.user._id }).populate("wishList"); // Corrected: Query condition
        if (!results) {
            return next(new AppError("Not found", 404));
        }
        res.json({ message: "Done", results }); // Sending response directly
});

export {
    addToWishList,
    removeFromWishList,
    getAllWishList
}; 

