import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../AxiosInstance'
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertsSlice'



const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async(values) => {
   try{
    dispatch(showLoading())
    const res = await axios.post('/api/v1/user/login',values);
    dispatch(hideLoading())
    if(res.data.success){
      message.success(res.data.message);
      localStorage.setItem('token',res.data.access_token)
      navigate('/')
    }else{
      message.error(res.data.message);
    }
   }catch(error){
    dispatch(hideLoading())
    console.log(error);
    message.error("Someting Went Wrong")
   }
  }
  return (
    <>
     <div className="form-container">
    
    <Form layout='vertical' onFinish={onFinishHandler} className="register-form" >

      <h4 className='text-center'>Login Form</h4>
     
      <Form.Item label="Email" name="email">
        <Input type='email' required></Input>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type='password' required></Input>
      </Form.Item>
      <Link to="/register" className="m-2">not a user register here</Link>
      <button className='btn btn-primary' type='submit'>Login</button>
      
    </Form>

  </div>
    </>
  )
}

export default Login
