import Job from "../models/job.model.js";

//  admin post the job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; //

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(200).json({
      message: "New job is created successfully.",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// // student for -----------------------------
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select:
          "name description website location logo userId createdAt updatedAt",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (err) {
    console.log(err);
  }
};

//  student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (err) {
    console.log(err);
  }
};

// admin : how many job created
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({
      created_by: adminId,
    }).populate({
      path: "company",
      createdAt: -1,
    });

    
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    console.log(err);
  }
};
