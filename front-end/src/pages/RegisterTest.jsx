import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../AxiosInstance'

import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertsSlice'

const RegisterTest = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const onFinishHandler = (values) => {
    console.log("hello", values)
  }


  const handlePassword = (e) => {
    const { value } = e.target;

    // Regex pattern to enforce password requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    // Check if the password matches the regex pattern
    if (value.match(passwordRegex)) {
      setPasswordError('');
    } else {
      setPasswordError(
        'Password should be minimum 6 characters, one letter, one number, and one special character.'
      );
    }

    setPassword(value);
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;

    // Check if the confirm password matches the password
    if (value === password) {
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Confirm password does not match.');
    }

    setConfirmPassword(value);
  };


  return (

    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className="register-form" >
          <h4 className='text-center'>Register Test From</h4>
          <Form.Item label="Name" name="name">
            <Input type='text' required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type='email' required></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError}
            rules={[
              {
                required: true,
                message: 'Please enter your password.',
              },
            ]}
          >
            <Input type="password" required onChange={handlePassword} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="c-password"
            validateStatus={confirmPasswordError ? 'error' : ''}
            help={confirmPasswordError}
            rules={[
              {
                required: true,
                message: 'Please confirm your password.',
              },
            ]}
          >
            <Input type="password" required onChange={handleConfirmPassword} />
          </Form.Item>
          
          <Link to="/login" className="m-2">If you have account then login here</Link>
          <button className="btn btn-primary" type="submit" disabled={!!confirmPasswordError}>
            Register
          </button>

        </Form>

      </div>
    </>
  )
}

export default RegisterTest
