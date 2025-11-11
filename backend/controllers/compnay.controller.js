import { Company } from "../models/company.model.js";

// registering company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    // authenticated middleware sets `req.id` to the logged-in user's id
    const userId = req.id;

    if (!companyName) {
      return res.status(400).json({
        message: "Compnay name required.",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You cannot register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId, // logged in user id
    });

    return res.status(201).json({
      message: "Comapany registered successfully.",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// get company
export const getCompany = async (req, res) => {
  try {
    // use the same `req.id` set by isAuthenticated middleware
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    // find by id
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// update compnay info
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // cloudinary

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
