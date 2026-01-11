import React, { useState } from "react";
import { assets } from "../assets/asset";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { themeMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sticky top-0">
      <div className="h-20 flex justify-between items-center px-4 md:px-10 border-b-2 relative z-50 transition-colors duration-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600">
        <div className="flex-shrink-0">
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 md:w-40 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <form className="hidden md:block relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-sm outline-none px-2 transition-colors bg-gray-100 text-gray-800 placeholder:text-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-200"
          />
          <IoSearch className="absolute right-2 top-2 text-2xl cursor-pointer text-gray-600 dark:text-white" />
        </form>

        <nav className="hidden md:block">
          <ul className="flex gap-5 list-none">
            <li>
              <a
                href="/"
                className="font-semibold text-lg transition-all cursor-pointer text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="font-semibold text-lg transition-all cursor-pointer text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-4 items-center">
          <div
            className="h-10 w-10 rounded-full flex justify-center items-center cursor-pointer transition-colors bg-gray-200 dark:bg-gray-700"
            onClick={toggleTheme}
          >
            {themeMode === "dark" ? (
              <MdLightMode className="text-2xl text-yellow-300" />
            ) : (
              <MdDarkMode className="text-2xl text-gray-700" />
            )}
          </div>

          {currentUser ? (
            <UserDropdown />
          ) : (
            <button
              className="hidden md:block bg-blue-700 w-25 h-10 px-4 rounded-sm text-white font-semibold hover:scale-105 transition-all cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          )}

          <div
            className="md:hidden text-3xl cursor-pointer text-gray-800 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full border-b-2 flex flex-col items-center py-5 gap-5 md:hidden shadow-lg transition-colors duration-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600">
            <form className="relative w-3/4">
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-full rounded-sm outline-none px-2 transition-colors bg-gray-100 text-gray-800 placeholder:text-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-200"
              />
              <IoSearch className="absolute right-2 top-2 text-2xl cursor-pointer text-gray-600 dark:text-white" />
            </form>

            <ul className="flex flex-col gap-5 list-none text-center">
              <li>
                <a
                  href="/"
                  className="font-semibold text-xl transition-all cursor-pointer text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="font-semibold text-xl transition-all cursor-pointer text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
            </ul>

            <button
              className="bg-blue-700 w-3/4 h-10 rounded-sm text-white font-semibold hover:bg-blue-600 transition-all cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
