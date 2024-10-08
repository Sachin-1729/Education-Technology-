import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSubscriber = createAsyncThunk(
    'allsubscriber/fetchAllSubscriber',
    async () => {
      const response = await fetch('http://localhost:7000/payment/subscribe');
      const data = await response.json();
      return data; // This will be the payload for fulfilled action
    }
  );

  const initialState = {
    allSubscriber: [],
    loading: false,
    error: null,
   
 };


 
const allsubscriber = createSlice({
    name: 'allsubscriber',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchAllSubscriber.pending , (state)=>{
              state.loading = true;
              state.error = null;
        })
        .addCase(fetchAllSubscriber.fulfilled , (state , action)=>{
            state.allSubscriber = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllSubscriber.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});


export default allsubscriber.reducer;