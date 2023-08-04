import React from 'react'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'

import axios from '../../AxiosInstance'
import { Table } from 'antd'

const Users = () => {
  const [users, setUsers] = useState([])


  const getAllUsers = async () => {

    try {

      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })

      console.log(">>>>>>>>>>>", res)
      if (res.data.success) {

        setUsers(res.data.data);
      }
    } catch (error) {

      console.log(error)


    }

  }


  useEffect(() => {

    getAllUsers();

  }, [])


   //antd table cplumn
   const columns =[
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title: 'Email',
      dataIndex:'email',
    },
    {
      title: 'Doctor',
      dataIndex:'isDoctor',
      render:(text,record)=>(
        <span>{record.isDoctor?'Yes': 'No'}</span>
      )
    },
    
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex">
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]

  return (
    <>
      <Layout>
      <h4 className='text-center m-2'>Users List</h4>
      <Table columns = {columns} dataSource={users} />

      </Layout>
    </>
  )
}

export default Users
