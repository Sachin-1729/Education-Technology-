
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching users from the API
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
      const response = await fetch('http://localhost:7000/users/getalluser');
      const data = await response.json();
      return data; // This will be the payload for fulfilled action
    }
  );
  
const initialState = {
    alluser: [],
    loading: false,
    error: null,
   
 };

 
const alluser = createSlice({
    name: 'alluser',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchAllUsers.pending , (state)=>{
              state.loading = true;
              state.error = null;
        })
        .addCase(fetchAllUsers.fulfilled , (state , action)=>{
            state.alluser = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export default alluser.reducer;