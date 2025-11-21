import React from "react";
import Navbar from "./shared/Navbar";
import Filter from "./FilterCards";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";

const Jobs = () => {
  const { allJobs = [] } = useSelector((store) => store.jobs);
  console.log(allJobs);
  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Filter Section */}
          <div className="w-[20%]">
            <Filter />
          </div>

          {/* Jobs Section */}
          {allJobs.length === 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
