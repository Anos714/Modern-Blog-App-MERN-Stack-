import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { profileSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  logout,
} from "../../redux/user/userSlice";
import { api } from "../../axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
    },
  });

  const handleProfileUpdate = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    if (data.password && data.password.trim() !== "") {
      formData.append("password", data.password);
    }
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    try {
      dispatch(updateUserStart());
      const response = await api.put(
        `/user/update/${currentUser.userId}`,
        formData
      );

      toast.success(response?.data?.msg);
      dispatch(updateUserSuccess());
    } catch (error) {
      console.error(error.message);

      dispatch(updateUserFailure());
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await api.delete(`/user/delete/${currentUser.userId}`);

      toast.success(response?.data?.msg);
      dispatch(deleteUserSuccess());
    } catch (error) {
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/user/logout");
      console.log(response);
      toast.success(response?.data?.msg);
      dispatch(logout());
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  const avatarFile = watch("avatar");
  const previewImage =
    avatarFile && avatarFile.length > 0
      ? URL.createObjectURL(avatarFile[0])
      : currentUser?.avatar || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen w-full p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <p className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Profile
        </p>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleProfileUpdate)}
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src={previewImage}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-md"
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Change Profile Picture
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  dark:file:bg-gray-700 dark:file:text-blue-400"
                {...register("avatar")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              {...register("username")}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Update
          </button>
        </form>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-2.5 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            onClick={handleDeleteUser}
          >
            Delete Account
          </button>

          <button
            className="w-full py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
