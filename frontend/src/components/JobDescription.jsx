import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/backendApi";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  // ---------------------------------
  // Fetch single job
  // ---------------------------------
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;
          dispatch(setSingleJob(job));

          // Check if this user already applied
          const applied = job.applications?.some(
            (a) => a.applicant === user?._id
          );
          setIsApplied(applied);
        }
      } catch (err) {
        toast.error("Failed to load job details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, user?._id]);

  // ---------------------------------
  // Apply job handler
  // ---------------------------------
  const applyJobHandler = async () => {
    if (isApplied) return;

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);

        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedJob));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  // ---------------------------------
  // Loading State
  // ---------------------------------
  if (loading)
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Loading job details...</p>
      </>
    );

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl capitalize">{singleJob?.title}</h1>

            <div className="flex items-center mt-4 gap-2">
              <Badge variant="ghost" className="text-blue-400 font-bold">
                {singleJob?.position}-position
              </Badge>
              <Badge variant="ghost" className="text-blue-800 font-bold">
                {singleJob?.jobType}
              </Badge>
              <Badge variant="ghost" className="text-blue-600 font-bold">
                {singleJob?.salary}
              </Badge>
            </div>
          </div>

          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="my-4">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-4 capitalize">
            {singleJob?.title}
          </h1>
        </div>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "-"}
          </span>
        </h1>
      </div>
    </>
  );
};

export default JobDescription;
