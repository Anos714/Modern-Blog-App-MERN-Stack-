import React from "react";
import { assets } from "../assets/asset";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="md:px-10 px-4 dark:bg-gray-900">
      <hr className="border-gray-300 mb-5" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-5">
        <div className="w-28">
          <img src={assets.logo} alt="logo" className="w-full" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            © {new Date().getFullYear()} Rahu sain
          </p>
        </div>
        <div className="flex gap-4 text-2xl text-gray-600">
          <FaGithub className="cursor-pointer hover:text-black transition-colors duration-300" />
          <FaLinkedin className="cursor-pointer hover:text-blue-600 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
