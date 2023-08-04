import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertsSlice';
import axios from '../AxiosInstance'
import { setUser } from '../redux/features/userSlice';
const ProtectedRoutes = (props) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)    //this user are same name from store   user: userSlice.reducer,
  const navigate = useNavigate(); // Get the navigate function
  //get user
  const getUserData = async()=>{
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/getUserData',{},{
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }

      });
      dispatch(hideLoading());
      if(res.data.success){
        dispatch(setUser(res.data.UserDetails));
       
      }else{
        <Navigate to='/login' />
        localStorage.clear();
      }
     }catch(error){
      dispatch(hideLoading());
      console.log(error);
      localStorage.clear();
      
      
    }
  }

  useEffect(()=>{
    if(!user){
      getUserData()
    }
    
  },[user,getUserData])


  if(localStorage.getItem('token')){
    return props.children
  }else{
    return <Navigate to='/login' />
  }
}

export default ProtectedRoutes
