import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from '../AxiosInstance'
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertsSlice'

const BookingPage = () => {
  const [doctors, setDoctors] = useState([])
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const [date, setDate] = useState(null); // Use null as initial state
  const [time, setTime] = useState(null); // Use null as initial state
  const [bookNow, setBookNow] = useState(true);
  // const [isAvailable, setIsAvailable] = useState();
  //**********doctor list************ */
  const getSingleDoctors = async () => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorById',
        { doctorId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      if (res.data.success) {
        setDoctors(res.data.data)
      }

    } catch (error) {
      console.log(error);
    }
  }
  //**********doctor list************ */

  // =============== booking func
  const handleBooking = async () => {
    console.log(">>>", time);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.id,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date.format("DD-MM-YYYY"), // Format the moment object
          time: time.format("HH:mm"), // Format the single moment object
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //==================== Doctor Availability

  const checkAvailability = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/check-appointment",
        {
          doctorId: params.id,
          date: date.format("DD-MM-YYYY"), // Format the moment object
          time: time.format("HH:mm"), // Format the single moment object
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setBookNow(false)
      } else {
        message.error(res.data.message);
        setBookNow(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleDoctors();
  }, [])
  return (
    <Layout>
      <h4 className='text-center'>Doctor Booking Page</h4>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation} </h4>
            {
              doctors.timings ? <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4> : ""
            }
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => setDate(value)} // Store the moment object
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => setTime(value)} // Store the moment object
              />
              <span>
                <button className="btn btn-primary mt-2 mx-4" onClick={checkAvailability}>Check Availability</button>
                <button className="btn btn-success mt-2" onClick={handleBooking} disabled={bookNow}>
                  Book Now
                </button>
              </span>

            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default BookingPage
