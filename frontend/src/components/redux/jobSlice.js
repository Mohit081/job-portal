import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    allAppliedJobs: [],
    singleJob: null,
    searchedQuery: "",
    searchJobByText: "",
    browseJob: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, actions) => {
      state.allAppliedJobs = actions.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setBrowseJob: (state, action) => {
      state.browseJob = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setAllAppliedJobs,
  setSingleJob,
  setSearchedQuery,
  setSearchJobByText,
  setBrowseJob,
} = jobSlice.actions;
export default jobSlice.reducer;
