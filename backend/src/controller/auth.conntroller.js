require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Cart= require("../model/cart.model")
const { comparePassword, hashPassword } = require("../utils/password.utils");
const Address = require("../model/address.model");
const EventEmmiter=require("events");
const { emit } = require('process');
const path = require('path');
const { welcomeMail} = require("../utils/utils");
const  eventEmmiter= new EventEmmiter();


// function to create new token
const newToken = (user,expireTime) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {expiresIn:expireTime});
};

const login = async (req, res) => {
  try {
     //! checking if user has varified his email address if not throw an error 
     let isAcountActive=await User.findOne({ where: { email: req.body.email , is_Active:0}, include:[{model:Address}] });
     if(isAcountActive){
      return res.status(400).send({message:"Please activate your account by verifying your email address"})
     }

    let user = await User.findOne({ where: { email: req.body.email , is_Active:1}, include:[{model:Address}] });
    
    if (!user) {
      return res
        .status(400)
        .send({ message: "Please check your email or passowrd" });
    }
    if (!comparePassword(req.body.password, user.password)) {
      return res
        .status(400)
        .send({ message: "Please check your email or passowrd" });
    }

    const token = newToken(user,"1d"); //!token will expire after 1 day
    const {
      user_Id,
      firstName,
      lastName,
      email,
      gender,
      profile_pic,
      Addresses,
      createdAt,
      updatedAt,
    } = user;
  
    // fetching all old cart items added by  the user
    const cartData= await Cart.findAll({where:{userId:user_Id}})

    return res.status(200).send({
      user: {
        user_Id,
        firstName,
        lastName,
        email,
        gender,
        profile_pic,
        Addresses,
        createdAt,
        updatedAt,
      },
      token,
      cartData
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send({ message: "Email has already been taken" });
    }
    user = await User.create({
      ...req.body,
      password: hashPassword(req.body.password),
      // profile_pic: req.file?.filename,
    });

    const token = newToken(user,"10m"); //!token will expire in 10 minutes


    eventEmmiter.on("userRegister",welcomeMail)
   
  
    eventEmmiter.emit('userRegister',{
      from:'wp.ecom.application@gmail.com',
      to:user.email,
      user,
      // alternatives:[{
      //    contentType:"text/html",
      //    path:path.join(__dirname,"../utils/welcomepage.html")
      // },],
      html: `
            Hii, ${user.firstName} ${user.lastName} \n
             
           <p>You have just registered with us 🎉😎🙌.So wihout doing any late we want  you to verify your email first.Please use the below given link for the verification process</p> \n
           <h5 style={fontWeight:'bold'}>Please note that the verification link is valid for only 10 minutes</h5>
           <a href='http://192.46.209.205:4564/users/register/emailVerification/${token}' >Click to verify</a>\n
           Thanks and regards <br/>
           The Wp Eom Team 
           `

    })
    return res.status(200).send({ user, token });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { login, register };
