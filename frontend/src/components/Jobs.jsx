import React from "react";
import Navbar from "./shared/Navbar";
import Filter from "./FilterCards";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const { alljobs = [] } = useSelector((store) => store.jobs);
  console.log(alljobs);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <Filter />
          </div>
          {alljobs?.length === 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {alljobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
