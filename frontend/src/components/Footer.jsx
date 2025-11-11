import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2b1058] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">JobPortal</h3>
            <p className="text-gray-400">
              Find your dream job or hire the perfect candidate. Join thousands
              of companies and job seekers who trust JobPortal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-gray-400 hover:text-white"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/tech"
                  className="text-gray-400 hover:text-white"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/category/healthcare"
                  className="text-gray-400 hover:text-white"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link
                  to="/category/finance"
                  className="text-gray-400 hover:text-white"
                >
                  Finance
                </Link>
              </li>
              <li>
                <Link
                  to="/category/education"
                  className="text-gray-400 hover:text-white"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  to="/category/marketing"
                  className="text-gray-400 hover:text-white"
                >
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>1234 Job Street</p>
              <p>Career City, ST 12345</p>
              <p>Email: info@jobportal.com</p>
              <p>Phone: (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
