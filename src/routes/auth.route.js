import express from "express";
import {Signup , Login } from '../controllers/auth.controllers.js'

const router = express.Router();

//signup routr

router.post('/signup',Signup)

//login route
router.post('/login',Login);

export default router;