import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [] } = useSelector((store) => store.jobs);
  const randomJobs = allJobs;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-semibold my-10 mx-auto text-lg">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
