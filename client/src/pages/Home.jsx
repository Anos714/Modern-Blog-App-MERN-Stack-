import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchFeaturedBlogs } from "../redux/thunks/blogThunk";
import moment from "moment";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { blogs, isFeatured } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchFeaturedBlogs());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full py-16 md:py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Welcome to BitBlogs
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
          Dive into the world of technology, coding, and design.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isFeatured ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">
              Featured Post
            </h2>

            <div
              key={isFeatured?._id}
              className="group relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-auto md:h-[400px]"
            >
              <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden">
                <img
                  src={isFeatured?.image}
                  alt={isFeatured?.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {isFeatured?.category}
                  </span>
                  <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-3.5 h-3.5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {isFeatured?.readTime} min read
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {isFeatured?.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg line-clamp-3">
                  {isFeatured?.subTitle}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <img src={isFeatured?.author.avatar} alt="" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {isFeatured?.author?.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        {moment(isFeatured?.createdAt).format("ll")}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    Read Article
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-600 pl-4">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {moment(post.createdAt).format("ll")}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {post.readTime} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-purple-500 cursor-pointer">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.subTitle}
                  </p>

                  <Link to={`blog/${post._id}`}>
                    <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline mt-auto self-start">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
