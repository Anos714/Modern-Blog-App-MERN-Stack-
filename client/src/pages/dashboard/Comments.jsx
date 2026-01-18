import React, { useEffect, useState } from "react";
import { Trash2, Search, AlertTriangle, X, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { showAllComments } from "../../redux/thunks/adminThunk";

const Comments = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);

  const handleShowComments = async () => {
    try {
      await dispatch(showAllComments()).unwrap();
    } catch (error) {
      toast.error("Users not found");
    }
  };

  useEffect(() => {
    handleShowComments();
  }, []);

  console.log(state);

  const [comments, setComments] = useState([
    {
      id: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      blogTitle:
        "React Hooks Guide: A Comprehensive Deep Dive into useEffect and UseState for Beginners",
      content:
        "This was really helpful, thanks for sharing! I was struggling with the dependency array in useEffect but this cleared everything up. Looking forward to more!",
      date: "2023-11-01",
    },
    {
      id: "2",
      userName: "Mike Ross",
      userEmail: "mike.r@firm.com",
      blogTitle: "Tailwind CSS Tips",
      content:
        "Can you explain more about group-hover and how it interacts with peer-hover in complex nested layouts?",
      date: "2023-11-05",
    },
    {
      id: "3",
      userName: "Sarah Connor",
      userEmail: "s.connor@resistance.com",
      blogTitle:
        "Node.js Performance Optimization and Scalability in Large Scale Enterprise Applications",
      content:
        "I disagree with the point about clustering. In my experience, there are better ways to handle scaling.",
      date: "2023-11-10",
    },
    {
      id: "4",
      userName: "Rachel Zane",
      email: "rachel@firm.com",
      blogTitle: "React Hooks Guide",
      content: "Excellent explanation of useEffect!",
      date: "2023-11-12",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredComments = comments.filter(
    (comment) =>
      comment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.blogTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setComments(comments.filter((c) => c.id !== deleteId));
      setDeleteId(null);
      setIsDeleting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <main className="p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              Comments Management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Sabhi blogs par aaye hue comments ko yahan se manage karein.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Comments
              </p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-white">
                {comments.length}
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Discussion Topics
              </p>
              <h3 className="text-2xl font-bold mt-1 text-indigo-600 dark:text-indigo-400">
                {[...new Set(comments.map((c) => c.blogTitle))].length} Blogs
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="relative w-full sm:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search comments, blogs, or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all text-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing {filteredComments.length} comments
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">User & Comment</th>
                    <th className="px-6 py-4 font-semibold">Blog Title</th>
                    <th className="px-6 py-4 font-semibold">Posted Date</th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                      <tr
                        key={comment.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group"
                      >
                        <td className="px-6 py-4 max-w-xs md:max-w-md">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0 mt-1">
                              {comment.userName.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                                {comment.userName}
                              </p>
                              <p
                                className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mt-0.5"
                                title={comment.content}
                              >
                                "{comment.content}"
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                            <MessageCircle size={14} className="shrink-0" />
                            <span
                              className="truncate max-w-[150px] md:max-w-[250px]"
                              title={comment.blogTitle}
                            >
                              {comment.blogTitle}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {comment.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setDeleteId(comment.id)}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete Comment"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic"
                      >
                        No comments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-transparent dark:border-slate-700">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <button
                onClick={() => setDeleteId(null)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Comment Delete Karein?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Kya aap sure hain ki aap{" "}
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {comments.find((c) => c.id === deleteId)?.userName}
              </span>{" "}
              ke is comment ko delete karna chahte hain?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl bg-red-600 dark:bg-red-500 text-white font-semibold hover:bg-red-700 dark:hover:bg-red-600 transition-all shadow-lg shadow-red-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
