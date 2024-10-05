import { COMPANIES_API_END_POINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANIES_API_END_POINT}/getcompany/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
