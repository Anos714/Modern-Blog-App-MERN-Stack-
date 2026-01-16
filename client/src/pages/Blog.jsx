import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../redux/thunks/blogThunk";
import moment from "moment";
import { useTheme } from "../context/ThemeContext";

const Blog = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.blog.blog);
  console.log(post);
  const { blogId } = useParams();
  const { themeMode } = useTheme();

  useEffect(() => {
    dispatch(fetchBlogById(blogId));
  }, []);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

  const dummyComments = [
    {
      id: 1,
      username: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      text: "This article really helped me understand the core concepts. The explanation about the useEffect hook was particularly clear!",
      date: "2 hours ago",
    },
    {
      id: 2,
      username: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      text: "Great read! Could you please make a follow-up post about advanced state management? I think that would be very beneficial.",
      date: "5 hours ago",
    },
    {
      id: 3,
      username: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      text: "I faced a similar issue in my last project. Thanks for sharing the solution.",
      date: "1 day ago",
    },
  ];

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {post?.category || "Category"}
        </span>
        <h1 className="text-3xl font-bold mt-2 mb-4">{post?.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Published on {moment(post?.createdAt).format("ll")}
        </p>

        <img
          src={post?.image}
          alt={post?.image}
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-4"
        />

        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 transition-colors ${
              isLiked
                ? "text-red-500"
                : "text-gray-600 dark:text-gray-400 hover:text-red-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="font-medium">{likeCount}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <span className="font-medium">{dummyComments.length}</span>
          </button>
        </div>
      </div>

      <div
        className="prose dark:prose-invert max-w-none mb-12"
        data-color-mode={themeMode === "light" ? "light" : "dark"}
      >
        <MDEditor.Markdown
          source={post?.content}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            fontSize: "1.1rem",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        />
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Leave a Comment
        </h3>

        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            required
          ></textarea>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-md"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Recent Comments ({dummyComments.length})
        </h3>
        <div className="space-y-6">
          {dummyComments.map((comm) => (
            <div
              key={comm.id}
              className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <img
                src={comm.avatar}
                alt={comm.username}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comm.username}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {comm.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {comm.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
