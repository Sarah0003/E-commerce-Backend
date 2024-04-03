import express from 'express';
// import { addUser, deleteUser, getAllUsers, getUserById } from './controller/user.controller';
import * as userController from './controller/user.controller.js'; 



const userRoutes=express.Router();

userRoutes.route("/")
  .post(userController.addUser)
  .get(userController.getAllUsers);

  userRoutes.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
  
  userRoutes.route("/changePassword/:id").patch(userController.changePassword);

export default userRoutes;
