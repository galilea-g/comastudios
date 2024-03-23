import  User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

import {createAccessToken} from '../libs/jwt.js'
import  { TOKEN_CACHE } from '../config.js';

/**
 * Verifies the authenticity of the token provided in the request cookies.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_CACHE, async (error, user) => {
        if (error) {
            return res.sendStatus(401);
        }

        const userFound = await User.findById(user.id);
        if (!userFound) {
            return res.sendStatus(401);
        }
    
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

/**
 * Get all users from the database.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const usersAll = async (req, res) => {
    try{
        const users = await User.find()

        if(!users){
            return res.status(404).json({message: 'User not found'})
        }

        res.json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Registers a new user with the provided information.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const register = async (req,res) => {
    const {username, email,password,typeUser} = req.body
    var type_user = typeUser    

    try {
        //Search exist user before save new
        const userFound = await User.findOne({email})
        if(userFound){
            return res.status(400).json(["email already exists"])
        }
        
        //encryptation of password 
        const passwordHash = await bcrypt.hash(password, 10);
        if(!type_user){
            type_user = 0
        }
        const newUser = User({
            username,
            email,
            password: passwordHash,
            typeUser: type_user,
        });
    
        const userSaved = await newUser.save();
        //Create token access in cache for user logged
        const token = await createAccessToken({id:  userSaved._id})
        
        //Save in cookies - sameSite that means the cookie does not belong to the same domain.
        res.cookie("token", token,{
            sameSite: 'none'
        })

        res.json({
            id: userSaved._id, 
            username:  userSaved.username,
            email: userSaved.email,
            typeUser: userSaved.typeUser
        });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 * Logs in a user with the provided email and password.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const login =  async(req,res) => {
    const {email, password} = req.body;

    try {
        const userFound = await User.findOne({email})
        if(!userFound){
            return res.status(400).json({message: "User not found"})
        }
    
        //encryptation of password 
        const passwordMatch = await bcrypt.compare(password, userFound.password);
    
        if(!passwordMatch){
            return res.status(400).json({message: "Incorrect password"})
        }
    
        //Create token access in cache for user logged
        const token = await createAccessToken({id:  userFound._id})
        //Save in cookies
        res.cookie("token", token)
        
        res.json({
            id: userFound._id, 
            username:  userFound.username,
            typeUser:  userFound.typeUser,
            email: userFound.email
        });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 * Logs out the currently logged-in user by clearing the token cookie.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const logout = async (req,res) => {
    res.cookie('token', "",{
        httpOnly: true,
        secure: true,
        expires:  new Date(0)
    })

    return res.sendStatus(200)
};

/**
 * Give the profile information of the currently logged-in user.
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound){
        return res.status(400).json({message: "User not found"})
    }

    return res.json({
        id: userFound._id, 
        username:  userFound.username,
        email: userFound.email,
        typeUser: userFound.typeUser,
        createdAt: userFound.createdAt
    });
}