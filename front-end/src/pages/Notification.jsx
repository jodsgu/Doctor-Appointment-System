import React from 'react'
import Layout from '../components/Layout'
import { Tabs, Form, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from '../AxiosInstance'
import { hideLoading, showLoading } from '../redux/features/alertsSlice';
import { deleteNotification, updateNotification } from '../redux/features/userSlice';
const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} =  useSelector(state=>state.user)



  const handelMarkAllRead = async()=>{
    try {
     
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
     
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(updateNotification());
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something Went Wrong');
    }
  }

  const handelDeleteAllRead = async()=>{
    try {
     
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
     
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(deleteNotification());
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something Went Wrong');
    }
  }
  return (
    <>
      <Layout >
          <h4 className='p-3 text-center'>Notification page</h4>
          <Tabs>
            <Tabs.TabPane tab="Unread" key={0}>
                <div className="d-flex justify-content-end">
                  <h4 className='p-2' onClick={handelMarkAllRead} style={{ cursor: 'pointer',color:"black" }}>Mark All Read</h4>
                </div>
                {
                  user&& user.notification.map(notificationMsg =>(
                    <div className="card" onClick={() => navigate(notificationMsg.data.onClickPath)} style={{ cursor: 'pointer' }}>
                      <div className="card-text">
                        {notificationMsg.message}
                      </div>
                    </div>
                  ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex justify-content-end">
                  <h4 className='p-2' onClick={handelDeleteAllRead} style={{ cursor: 'pointer', color: 'black'  }}>Delete All Read</h4>
                </div>
                {
                  user&& user.seennotification.map(notificationMsg =>(
                    <div className="card" onClick={() => navigate(notificationMsg.data.onClickPath)} style={{ cursor: 'pointer'  }}>
                      <div className="card-text">
                        {notificationMsg.message}
                      </div>
                    </div>
                  ))
                }
            </Tabs.TabPane>
          </Tabs>
      </Layout>
    </>
  )
}

export default Notification
