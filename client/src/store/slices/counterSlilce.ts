import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'




export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // يمكنك فك التعليق واستدعاء API الحقيقي هنا
  return [];
});


// Define a type for the slice state
export interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
    extraReducers: builder => {
    // builder
    //   .addCase(userLoggedOut, state => {
    //     // Clear out the list of posts whenever the user logs out
    //     return initialState
    //   })
    //   .addCase(fetchPosts.pending, (state, action) => {
    //     state.status = 'pending'
    //   })
    //   .addCase(fetchPosts.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     // Add any fetched posts to the array
    //     state.posts.push(...action.payload)
    //   })
    //   .addCase(fetchPosts.rejected, (state, action) => {
    //     state.status = 'failed'
    //     state.error = action.error.message ?? 'Unknown Error'
    //   })
  }
})

export const {} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer