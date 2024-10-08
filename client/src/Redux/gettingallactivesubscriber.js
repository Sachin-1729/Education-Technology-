import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk for fetching active subscribers
const fetchAllActiveSubscriber = createAsyncThunk(
  'allactivesubscriber/fetchAllActiveSubscriber',
  async () => {
    const token = localStorage.getItem('Token');
    const response = await fetch('http://localhost:7000/content/gettingcurrentactivesubscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // Uncomment if token needs to be in Authorization header
      },
      body: JSON.stringify({ userToken: token })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch active subscribers');
    }

    const data = await response.json();
    
    return data; // This will be the payload for fulfilled action
  }
);

// Initial state for the slice
const initialState = {
  allactivesubscriber: [],
  loading: false,
  error: null
};

// Creating a slice with reducers and extraReducers for async action
const currentactivesubscriber = createSlice({
  name: 'fetchAllActiveSubscriber',
  initialState,
  reducers: {}, // No sync reducers defined here
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActiveSubscriber.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(fetchAllActiveSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.allactivesubscriber = action.payload; // Store the fetched subscribers
      })
      .addCase(fetchAllActiveSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

export default currentactivesubscriber.reducer;
export { fetchAllActiveSubscriber };
