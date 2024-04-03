import express from 'express';
import { signIn, signUp } from './controller/auth.controller.js';


const authRoutes=express.Router();

authRoutes.post("/signUp",signUp)

  authRoutes.post("/signIn",signIn)
  // authRoutes.post("/logOut",logout)

export default authRoutes;
