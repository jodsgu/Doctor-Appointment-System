import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../AxiosInstance'

import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertsSlice'

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onFinishHandler = async(values) => {
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/signup',values);
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.messages)
        navigate('/login')
      }else{
        message.error(res.data.message);
        
      }

    }catch(error){
      dispatch(hideLoading())
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
          // Access error properties: error.type, error.value, error.msg, error.path, error.location
          message.error(error.msg);
        });
      } else {
        message.error("Something Went Wrong");
      }
    }
  }
  return (

    <>
      <div className="form-container">
      <Form layout='vertical' onFinish={onFinishHandler} className="register-form" >
        <h4 className='text-center'>Register From</h4>
        <Form.Item label="Name" name="name">
          <Input type='text' required></Input>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type='email' required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type='password' required></Input>
        </Form.Item>
        <Link to="/login" className="m-2">If you have account then login here</Link>
        <button className='btn btn-primary' type='submit'>Register</button>
       
      </Form>

    </div>
    </>
  )
}

export default Register
