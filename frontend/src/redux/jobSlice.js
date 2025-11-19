import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    singleJob: null,
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    }, 
  },
});

export const { setAllJobs,setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
