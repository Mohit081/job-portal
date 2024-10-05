import { COMPANIES_API_END_POINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANIES_API_END_POINT}/getcompany`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
