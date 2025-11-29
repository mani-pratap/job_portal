import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  useGetAllJobs();

  const { allJobs = [] } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Reset filter
  const clearFilterHandler = () => {

    dispatch(setSearchedQuery(""));
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex flex-row justify-between  my-10 mx-auto px-5">
          <h1 className=" font-semibold text-lg">
            Search Results ({allJobs.length})
          </h1>
          <div className="items-center">
            <button
              onClick={clearFilterHandler}
              className="text-sm text-white p-2 rounded-md  bg-[#6A38C2] font-semibold hover:text-purple-800 transition">
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
