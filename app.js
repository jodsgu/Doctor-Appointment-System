const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv  =require("dotenv"); //.env variable use
const dbConnection = require('./db');
const userRoutes = require('./api/routes/userRoutes');
const adminRoutes = require('./api/routes/adminRoutes');
const doctorRoutes = require('./api/routes/doctorRoutes');
dbConnection();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//dotenv config
dotenv.config();


//route
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/doctor',doctorRoutes)

const errorHandler = (err,req,res,next)=>{
  
  if(res.headerSent){
    return next(err);
  }
  res.status(500).json({ 
    status:false,
    error: err
    
  });
}

app.use(errorHandler);


//code for url not found
app.use((req,res,next)=>{
  //custom error define
  const error = new Error('Page Not found...');
  error.status = 404;
  next(error);

})
app.use((err,req,res,next)=>{
  res.status(err.status || 500)
  res.json({
      status  : 'error', 
      message : err.message
    
  })
})
// port
const port = process.env.PORT || 6000

//listen port
app.listen(port,()=>{
  console.log(`Server Running in ${process.env.NODE_MODE} on port ${process.env.PORT}`.bgCyan.white)
})