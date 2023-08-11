import React, { } from 'react';
import { UserMenu, AdminMenu } from '../SidebarMenu/Menu';
import '../styles/Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { message, Badge } from 'antd';

import {useSelector,useDispatch} from 'react-redux'
import { clearUser } from '../redux/features/userSlice';

const Layout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useSelector(state => state.user)
  
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

  // Logout function
  const handleLogout = () => {
    dispatch(clearUser())
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login')
  };


  //======================doctor menu========================
const DoctorMenu = [
  {
    name:'Home',
    path:'/',
    icon:"fa-sharp fa-solid fa-house"
  },
  {
    name:'Appointments',
    path:'/doctor-appointments',
    icon:"fa-solid fa-list"
  },
  
  {
    name:'Profile',
    path:`/doctor/profile/${user && user._id}`,
    icon:"fa-solid fa-user"
  }


]
//======================doctor menu========================

  //rendering sideber menu list
  const sidebarMenu = user && user.isAdmin ? AdminMenu : user && user.isDoctor? DoctorMenu : UserMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sideber">
            <div className="logo">
              <h6>DOC APP </h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={index} className={`menuItem ${isActive && 'active'}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={`menuItem`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
                
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: 'pointer' }}>
                <Badge count={user && user.notification.length} >
                  <i className="fa-solid fa-bell" style={{ margin: '1px',color:'white' }} onClick={()=>{navigate('/notification')}}></i>
                </Badge>
                <Link to="/profile"  style={{color:'white' }}>{user && user.name}</Link>
              </div>
            </div>
            <div className="body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
