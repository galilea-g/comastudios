/**
 * This file defines routes for user authentication and related operations.
 * It includes routes for user registration, login, logout, profile retrieval,
 * token verification, and getting all users.
 * All routes except for '/users' and '/register' require authentication.
 */
import { Router } from "express";
import { 
    login, 
    register,
    logout,
    profile, 
    usersAll,
    verifyToken 
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validatorMiddleware.js"

import {registerValidate,loginSchema} from "../validators/auth.validator.js"
import verify from "jsonwebtoken/verify.js";

const router = Router()

router.get('/users', usersAll)
router.post('/register',validateSchema(registerValidate), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.post('/verify', verifyToken)
router.get('/profile', authRequired, profile)

export default router;