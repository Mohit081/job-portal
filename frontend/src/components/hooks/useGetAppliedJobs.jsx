import { APPLICATIONS_API_END_POINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATIONS_API_END_POINT}/appliedjobs`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
