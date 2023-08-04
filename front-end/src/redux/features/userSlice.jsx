import {createSlice} from  '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userSlice',
  initialState:{
    user:null
  },
  reducers:{
    setUser:(state,action)=>{
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null; // Reset the user data to null when clearing
    },
    updateNotification:(state,action)=>{
      state.user = action.payload;

    },
    deleteNotification:(state,action)=>{
      state.user= action.payload;
    }
  }
})
export const {setUser,clearUser,updateNotification,deleteNotification} = userSlice.actions