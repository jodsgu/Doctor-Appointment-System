const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
//User model create
const userScheama = require('../models/userModels');
const User = new mongoose.model('User', userScheama)

//Doctor model create
const doctorSchema = require('../models/doctorModels');
const Doctor = new mongoose.model('Doctor',doctorSchema);

//user registration
userSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }


  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Sorry! email is already exist..Please try a another email",
      })
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
      })
      const saveUser = await user.save();
      res.status(200).json({
        success: true,
        messages: 'Signup was sucessfull',


      })
    }

  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }

}


//user login
loginUser = async (req, res, next) => {

  try {
    const userEmailExisting = await User.findOne({ email: req.body.email })
    //console.log(">>>>>>>>>>>>>",userEmailExisting);
    if (!userEmailExisting) {
      return res.status(200).json({
        success: false,
        message: "Authentication Failed"
      })
    } else {
      const checkValiedPassword = await bcrypt.compare(req.body.password, userEmailExisting.password)
      if (!checkValiedPassword) {
        return res.status(400).json({
          success: false,
          message: "Authentication Failed"
        })
      } else {
          // Genarate jwt 
          const token = jwt.sign({
            id: userEmailExisting._id,
            email: userEmailExisting.email,
            name: userEmailExisting.name
          }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });
          res.status(200).json({
            success: true,
            message: "Login Successfully",
            access_token: token,
            UserDetails:{
              id: userEmailExisting._id,
              email: userEmailExisting.email,
              name: userEmailExisting.name
            }

          })
      }





    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      erorr: "There is a server side error"
    })

  }

}

getUserData = async (req,res,next)=>{
 try{
  const userDetails = await User.findById(req.id).select(' _id name email isAdmin isDoctor notification seennotification' );
  if(!userDetails){
    return res.status(400).json({
      success: false,
      error:"Authentication Failed"
    })
  }else{
    res.status(200).json({
      message: "User was fetch sucessfully",
      UserDetails:userDetails

    })
  }

 }catch(err){
  res.status(500).json({
    success: false,
    error:"Authentication Failed"
  })
 }
}

applyDoctor = async(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  try{

   
    const newDoctor = new Doctor({

      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,     //if direct api then req.body.userId   ==> req.id
      firstName: req.body.firstName,
      lastName : req.body.lastName,
      phone: req.body.phone,
      email : req.body.email,
      website: req.body.website,
      address :req.body.address,
      specialization:req.body.specialization,
      experience: req.body.experience,
      feesPerCunsaltation:req.body.feesPerCunsaltation,
      timings : req.body.timings,
      status:"pending"

    })
    
    await newDoctor.save();

    //notification 
    const adminUser = await User.findOne({isAdmin:true})
   
    const notification = adminUser.notification;
    
    notification.push({
      type:'apply-doctor-request',
      message:`${newDoctor.firstName} ${newDoctor.lastName} Has applied for Doctror Account`,
      data:{
        doctorId:newDoctor._id,
        name : newDoctor.firstName +" " + newDoctor.lastName,
        onClickPath: '/admin/doctors'

      }
    })
    await User.findByIdAndUpdate(adminUser._id, { notification });

    res.status(201).json({
      success:true,
      message:'Doctor Account Applied Successfully'
    }) 


  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}


//get all notification 
const getAllNotification = async(req,res,next)=>{
  try{
   // const user = await User.findOne({_id:req.id}) //if direct api then req.body.userId   ==> req.id
   const user = await User.findOne({_id:req.body.userId})    
    
    const seennotification = user.seennotification
    const notification = user.notification


    seennotification.push(...notification)
    user.notification = []
  

   /*  notification.push(...seennotification)   //testing purpose
    user.seennotification = [] */

    const updatedUser = await user.save();
    res.status(200).json({
      success : true,
      message: 'all notification marked as read',
      data:updatedUser 
    })

  }catch(err){
    res.status(500).json({
      success: false,
      error:"There is a server side error"
    })
   }
}


const deleteAllNotification = async(req,res,next)=>{
  try{
    const user = await User.findOne({_id:req.body.userId});
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined
    res.status(200).json({
      success:true,
      message:"Notification Deleted Successfully",
      data: updatedUser
    })
  }catch(err){
    res.status(500).json({
      success: false,
      error:"There is a server side error"
    })
   }

}


const getAllDoctors = async(req,res,next)=>{
  try{
    const  doctor = await Doctor.find({status : 'approved'})
      res.status(200).json({
        success:true,
        message: 'Doctor data fetch successfuly',
        data: doctor

      })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}

module.exports = { userSignUp, loginUser,getUserData,applyDoctor,getAllNotification,deleteAllNotification,getAllDoctors }



