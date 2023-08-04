import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import axios from '../AxiosInstance'
import moment from 'moment';
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertsSlice';
import { useNavigate } from 'react-router-dom'

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)

  //handel from
  const handelFinish = async (values)=>{
     // Format the moment objects to strings in the required format
  const formattedTimings = values.timings.map((time) => time.format('HH:mm'));

    try{
     console.log(">>>>>>>",values)
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/apply-doctor',
      {
        ...values,
        userId: user._id,
        timings: formattedTimings,
      },{
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
        
      dispatch(hideLoading())
      if(res.data.success){
        const responseMessage = res.data.message;
        message.success(responseMessage);
        navigate('/');
      }else{
      
        dispatch(hideLoading())
        message.error("Something Went Wrong");
      }

    }catch(error){
      console.log(error);
      message.error("Something went wrong");
      dispatch(hideLoading())
      navigate('/apply-doctor')
    }
  }

  return (
   <>
    <Layout>
        <h3 className='text-center'>Apply Doctor</h3>  
        <Form layout='vertical' onFinish={handelFinish} className="m-3">
        <h4 className='' >Personal Details :</h4>
            <Row gutter="15">
                
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="First Name" name="firstName" required>
                    <Input type='text' placeholder='your first name'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Last Name" name="lastName" required>
                    <Input type='text' placeholder='your last name'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Phone Number" name="phone" required>
                    <Input type='text' placeholder='your phone number'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Email" name="email" required>
                    <Input type='text' placeholder='your email'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Website" name="website" required>
                    <Input type='text' placeholder='your website'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Address" name="address" required>
                    <Input type='text' placeholder='your address'/>
                  </Form.Item>

                </Col>

            </Row>
            <br />
            <h4 className=''>professional Details :</h4>
            <Row gutter="15">
                
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Specialization" name="specialization" required>
                    <Input type='text' placeholder='your specialization'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Experience" name="experience" required>
                    <Input type='text' placeholder='your experience'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Fees" name="feesPerCunsaltation" required>
                    <Input type='text' placeholder='your fees'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Timings" name="timings" required>
                   <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type='submit'>Submit</button>


                </Col>
               

            </Row>
            


        </Form>
    </Layout> 
   </>
  )
}

export default ApplyDoctor
