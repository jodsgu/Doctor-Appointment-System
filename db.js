const mongoose = require('mongoose');

const connectDb = async()=>{
  try{
    await mongoose.connect('mongodb://localhost:27017/doctor-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected successfully');

  }catch (err) {
    console.error('Database connection failed:', err.message);
  }


}
module.exports = connectDb;