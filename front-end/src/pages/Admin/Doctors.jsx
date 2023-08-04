import React from 'react'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'

import axios from '../../AxiosInstance'
import { Table, message } from 'antd'
const Doctors = () => {

  // const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);

  //get Doctor
  const getAllDoctor = async () => {
    try {

      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })

      console.log(">>>>>>>>>>>", res)
      if (res.data.success) {

        setDoctors(res.data.data);
      }
    } catch (error) {

      console.log(error)


    }

  }


  const handelAccountStatus = async(record,status)=>{
    try{
      const res = await axios.post('/api/v1/admin/changeAccountStatus',{doctorId: record._id, status:status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
      )
      console.log("@@@@@@@@@",res);
      if(res.data.success){
        message.success(res.data.message)
       // Update the status locally
       const updatedDoctors = doctors.map(doctor => {
        if (doctor._id === record._id) {
          return {
            ...doctor,
            status: status
          };
        }
        return doctor;
      });

      setDoctors(updatedDoctors);

      }

    }catch(error){
        message.error('Something Went Wrong')
    }
}


  useEffect(() => {

    getAllDoctor();

  }, [])


  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending'? (<button className='btn btn-success' onClick={ ()=>handelAccountStatus(record,"approved")}>Approve</button> ):
          ( <button className='btn btn-danger'>Reject</button>)}
        </div>
      )
    }

  ]

  return (
    <>
      <Layout>
        <h4 className='text-center m-2'>All doctors</h4>
        <Table columns={columns} dataSource={doctors} rowKey="_id" />
      </Layout>
    </>
  )
}

export default Doctors
