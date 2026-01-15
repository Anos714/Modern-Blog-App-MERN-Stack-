import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../validation";
import MDEditor from "@uiw/react-md-editor";
import { useSelector, useDispatch } from "react-redux";
import { createNewBlog } from "../../redux/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { isSuccess, isError, message } = useSelector;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    mode: "onChange",
  });

  const imageFile = watch("image");
  const previewImage =
    imageFile && imageFile.length > 0
      ? URL.createObjectURL(imageFile[0])
      : null;

  const handleAddBlog = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("category", data.category);
    formData.append("content", data.content);

    dispatch(createNewBlog(formData));
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 dark:bg-gray-900 dark:border dark:border-gray-700">
      <div className="bg-white p-4 dark:bg-gray-800 rounded-xl md:px-30">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Create New Post
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(handleAddBlog)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image
            </label>
            <div className="w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center md:w-[400px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden relative"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...register("image")}
                />
              </label>
            </div>
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-[500px]"
              placeholder="Enter blog title"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subTitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-[500px]"
              placeholder="Enter a short subtitle"
              {...register("subTitle")}
            />
            {errors.subTitle && (
              <p className="mt-2 text-sm text-red-600">
                {errors.subTitle.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-[500px]"
              {...register("category")}
            >
              <option value="">Select a category</option>
              <option value="All">All</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>

            <div className="md:w-[500px]" data-color-mode="light">
              {" "}
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={400}
                    style={{ borderRadius: "0.5rem", overflow: "hidden" }}
                    textareaProps={{
                      placeholder: "Write your markdown content here...",
                    }}
                  />
                )}
              />
            </div>
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
