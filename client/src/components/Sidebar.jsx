import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <aside className="min-h-screen w-20 md:w-50 bg-gray-50 dark:bg-gray-800">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard/profile"
              end
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <HiUser className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                Profile
              </span>
              <span className="md:inline-flex hidden items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300 ">
                {currentUser.role}
              </span>
            </NavLink>
          </li>

          {currentUser.role === "admin" ? (
            <li>
              <NavLink
                to="/dashboard/add-blog"
                end
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaPlusCircle className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                  Add blog
                </span>
                {/* <span className="md:inline-flex hidden items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300 ">
                  {currentUser.role}
                </span> */}
              </NavLink>
            </li>
          ) : null}

          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
              <HiArrowSmRight className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap hidden md:inline-block">
                Sign Out
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
