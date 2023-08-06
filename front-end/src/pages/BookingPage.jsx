import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout'
import {useParams } from 'react-router-dom'
import axios from '../AxiosInstance'
import { DatePicker, TimePicker } from 'antd'
import moment from "moment";

const BookingPage = () => {
  const [doctors,setDoctors] = useState([])
  const params = useParams();
  console.log(">>>>>",params)

//**********doctor list************ */
const getSingleDoctors = async()=>{
  try{
    const res = await axios.post('/api/v1/doctor/getDoctorById',
    {doctorId: params.id},
    {
      headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    if(res.data.success){
      setDoctors(res.data.data)
    }
      
  }catch(error){
    console.log(error);
  }
}
//**********doctor list************ */
useEffect(()=>{
  getSingleDoctors();
},[])
  return (
   <Layout>
     <h4 className='text-center'>Doctor Booking Page</h4>
    <div className="container m-2">
      {doctors &&(
        <div>
        <h4>
          Dr. {doctors.firstName} {doctors.lastName}
        </h4>
        <h4>Fees: {doctors.feesPerCunsaltation} </h4>
        {
          doctors.timings ? <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4> :""
        }
         <div className="d-flex flex-colunm w-50">
            <DatePicker className='m-2' format="DD-MM-YYYY"  onChange={(value)=>setDate(moment(value).format('DD-MM-YYYY'))}/>
            <TimePicker.RangePicker className='m-2' format="HH:mm"onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }} />
            <button className='btn btn-primary mt-2 mx-4'>Check Availability</button>
            <button className='btn btn-success mt-2'>Book Now</button>
        </div>
      </div>
      )}
    </div>
   </Layout>
  )
}

export default BookingPage
