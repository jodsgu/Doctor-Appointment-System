const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const doctorControllers = require('../controllers/doctorControllers');
const router = express.Router();

//Get Single Doctor Info
router.post('/getDoctorInfo',checkLogin,doctorControllers.getDoctorInfo)

//post Update doctor profile
router.post('/updateDoctorProfile',checkLogin,doctorControllers.updateDoctorProfile)

//POST get a single doctor information 
router.post('/getDoctorById',checkLogin,doctorControllers.getDoctorById)

module.exports = router;

