import { JOB_API_END_POINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setBrowseJob } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        // if (res.data.success) {
        //   console.log(res.data)
        //   dispatch(setAllJobs(res.data.data));
        if (searchedQuery.length > 0) {
          dispatch(setBrowseJob(res.data.data));
        } else {
          dispatch(setAllJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
