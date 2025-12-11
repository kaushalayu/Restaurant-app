require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const createHttpError = require("http-errors");
const User = require('../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async(req,res,next)=>{
    try
    {
        const {email,phone,name,password,role} = req.body;
        if(!email || !phone || !name || !password || !role)
        {
            const error = createHttpError(400,"All fields are required");
             return next(error);
        }
        const isUserPresent = await User.findOne({email});
        if(isUserPresent)
        {
            const error = createHttpError(400,"User already exist");
         return   next(error);
        }

        const hash = await bcrypt.hash(password,10);
        

        const user = {
            name,phone,email,password:hash,role
        }
        const newUser = User(user);
        await newUser.save();

        res.status(201).json({
            success:true,message:"New User created",data:newUser
        })

    }
    catch(err)
    {
       return next(err);

    }
}

const login = async(req,res,next)=>{
    try
    {
        const {email,password} = req.body;
        if(!email || !password) 
        {
            const error = createHttpError(400,"All field required");
           return next(error);
        }

        const isUserPresent = await User.findOne({email});
        if(!isUserPresent)
        {
            const error = createHttpError(400,"User not available");
           return next(error);
        }
        const isMatched = bcrypt.compare(password,isUserPresent.password);
        if(!isMatched)
        {
            const error = createHttpError(401,"Invalid Credintial");
           return next(error);
        }
        const accessToken = await jwt.sign({_id:isUserPresent._id},process.env.
JWT_TOKEN,{expiresIn:'1d'})

res.cookie('accessToken',accessToken,{
    maxAge : 1000 * 60 * 60 * 24 * 30,
    httpOnly:true,
    sameSite:"none",
    secure:true
})
res.status(200).json({
    success:true,
    message:"User logged in",
    data:isUserPresent
});


    }
    catch(error)
    {
       return next(error)

    }
}


const getUser = async(req,res)=>{
    try
    {

        const user = await User.findById(req.user._id);
        res.status(200).json({success:true,date:user});

    }
    catch(error)
    {
        return next(error);

    }
}

module.exports = {register,login,getUser};