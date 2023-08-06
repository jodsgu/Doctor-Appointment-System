import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'


import { useSelector } from "react-redux"
import Spinner from './components/Spinner'
import PublicRoutes from '../src/components/PublicRoutes'
import ProtectedRoutes from '../src/components/ProtectedRoutes'
import RegisterTest from './pages/RegisterTest'
import ApplyDoctor from './pages/ApplyDoctor'
import Notification from './pages/Notification'
import Users from './pages/Admin/Users'
import Doctors from './pages/Admin/Doctors'
import Profile from './pages/Doctor/Profile'
import BookingPage from './pages/BookingPage'

function App() {
  //console.log("----6565-------")
  const { loading } = useSelector(state => state.alerts) // alerts comming from store.js
  //console.log("______>>>>____",loading)
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner /> :
          <Routes>
            <Route path='/' element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            } />

            <Route path='/apply-doctor' element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            } />

            <Route path='/notification' element={
              <ProtectedRoutes>
                <Notification />
              </ProtectedRoutes>
            } />

            <Route path='/admin/users' element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            } />

            <Route path='/admin/doctors' element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            } />

            <Route path='/doctor/profile/:id' element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            } />
            <Route path='/doctor/book-appoinment/:id' element={
              <ProtectedRoutes>
                <BookingPage />
              </ProtectedRoutes>
            } />



            <Route path='/login' element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            } />
            <Route path='/register' element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            } />

            <Route path='/registerTest' element={
              <PublicRoutes>
                <RegisterTest />
              </PublicRoutes>
            } />

          </Routes>


        }


      </BrowserRouter>
    </>
  )
}

export default App
