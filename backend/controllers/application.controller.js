import express from "express";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // job id send or not
    if (!jobId) {
      return res.status(400).json({
        message: "jobId is required.",
        success: false,
      });
    }

    // check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }

    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // create a new application

    // application collection ko create karege
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // job collection ko update karege
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// user ke sare applied jobs (with job + company info)
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find all applications by that user
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// admin dekhega how many users applied for the job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    // find application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
