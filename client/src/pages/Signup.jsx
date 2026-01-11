import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../axios";
import { useDispatch } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from "../redux/user/userSlice";
import toast from "react-hot-toast";
import GoogleAuth from "../components/GoogleAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleFormSubmit = async (data) => {
    try {
      dispatch(signupStart());
      const response = await api.post("/user/signup", data);
      dispatch(signupSuccess(response?.data?.user));
      toast.success(response?.data?.msg || "User sign up successfully");
      navigate("/");
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || "Internal server error";
      dispatch(signupFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors pt-24 duration-300">
      <div className="max-w-sm w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create <span className="text-blue-700">Account</span>
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign up to get started
          </p>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                {...register("username")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleAuth mode="signup" />
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
