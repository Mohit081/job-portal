import React from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobsCards";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl md:mx-auto my-20">
      <h1 className="text-4xl font-bold md:px-0 px-5">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid md:grid-cols-3 gap-4 my-5 md:px-0 px-5">
        {allJobs <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              key={job?._id}
            >
              <LatestJobCards key={job._id} job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
