import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATIONS_API_END_POINT } from "@/utlis/constants";
import { setAllApplicants } from "../redux/applicationSlice";
import ApplicantsTable from "./ApplicantsTable";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATIONS_API_END_POINT}/getapplicants/${params.id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
