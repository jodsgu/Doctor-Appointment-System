const express = require('express');
const mongoose = require('mongoose');



//Doctor model create
const doctorSchema = require('../models/doctorModels');
const Doctor = new mongoose.model('Doctor',doctorSchema);

const getDoctorInfo = async(req,res,next)=>{

  try{
    const  doctor = await Doctor.findOne({userId : req.body.userId})
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

const updateDoctorProfile = async(req,res,next)=>{
  try{
      const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId},req.body)
      res.status(201).json({
        success:true,
        message: 'Doctor Profile Update Successfully',
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

const getDoctorById = async(req,res,next)=>{
  try{
    console.log(">>>>>",req);
    const doctor = await Doctor.findOne({_id: req.body.doctorId})
    //const doctor = await Doctor.findOne({_id: req.body._id})
    res.status(200).json({
      success:true,
      message: 'Doctor fetch Successfully',
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

module.exports = { getDoctorInfo,updateDoctorProfile,getDoctorById}
