import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { api } from "../axios";

const Blog = () => {
  const [blog, setBlog] = useState(null);

  const showBlog = async () => {
    try {
      const response = await api.get("/blog/696733536e950c22093330f2");
      console.log(response);
      setBlog(response?.data?.blog);
    } catch (error) {}
  };
  useEffect(() => {
    showBlog();
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-5 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="mb-8">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {blog?.category}
        </span>
        <h1 className="text-3xl font-bold mt-2 mb-4">{blog?.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Published on {blog?.createdAt}
        </p>
        <img
          src={blog?.image}
          alt={blog?.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      <div
        className="prose dark:prose-invert max-w-none"
        data-color-mode="dark"
      >
        <MDEditor.Markdown
          source={blog?.content}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        />
      </div>
    </div>
  );
};

export default Blog;
