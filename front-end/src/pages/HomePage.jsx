import { message } from 'antd';
import axios from '../AxiosInstance'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'
const HomePage = () => {

  const [doctors,setDoctors] = useState([])



  //**********doctor list************ */
const getAllDoctors = async()=>{
  try{
    const res = await axios.post('/api/v1/user/getAllDoctors',{},{
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
  getAllDoctors();
},[])
  return (
    <>
   <Layout >
         <h4 className='text-center'>Doctor List</h4>
          <Row >
            {
              doctors && doctors.map((doctor,index)=>{
                return(
                  
                  <DoctorList doctor = {doctor} key={doctor._id}  />
                )
              })
            }


          </Row>
      </Layout>
    </>
  )
}

export default HomePage
