import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-grey-100 text-[#F83002]font-medium">
          No. 1 Job Shop Website
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className=" hidden md:block">
          Connect with 20,000+ employers. Apply to millions of job opportunities across top companies, industries and locations on India's No.1 job site. Apply online. Post CV today.
        </p>
        <div className="flex  shadow-lg border border-gray-100 pl-3 rounded-full items-center gap-4 md:mx-auto md:w-[40%]">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            className="rounded-r-full bg-[#6A38A2]"
            onClick={searchJobHandler}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
