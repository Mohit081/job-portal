import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { setSearchedQuery } from "./redux/jobSlice";
import { Button } from "./ui/button";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  useGetAllJobs();
  const { browseJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex my-10 gap-8">
          <Button
            className=" flex md:hidden pb-4 bg-white text-black pl-6"
            onClick={(e) => navigate("/")}
          >
            <StepBack />
          </Button>
          <h1 className="font-bold text-xl ">
            Search Results{" "}
            <span className="text-[#F83002]">({browseJob.length}) </span>
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {browseJob.length > 0 &&
            browseJob?.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
