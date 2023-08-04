import {configureStore} from '@reduxjs/toolkit'
import { alertSclice } from './features/alertsSlice'
import { userSlice } from './features/userSlice'

export default configureStore({
  reducer:{
    alerts : alertSclice.reducer,
    user: userSlice.reducer
  }
})