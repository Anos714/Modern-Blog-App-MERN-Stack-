import React, { useState, useEffect } from "react";
import { Trash2, Search, AlertTriangle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showAllUsers } from "../../redux/thunks/adminThunk";
import toast from "react-hot-toast";
import moment from "moment";

const AllUsers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin.users);

  const handleShowUser = async () => {
    try {
      await dispatch(showAllUsers()).unwrap();
    } catch (error) {
      toast.error("Users not found");
    }
  };

  useEffect(() => {
    handleShowUser();
  }, []);

  console.log(state);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUsers = state?.users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteUser(deleteId)).unwrap();
      setDeleteId(null);
      setIsDeleting(false);
    } catch (error) {
      toast.error("Something wrong occurred, Please try again");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <main className="p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              User Management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Monitor system access and manage user permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Accounts
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {state?.totalUsersCount}
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Administrators
              </p>
              <h3 className="text-2xl font-bold mt-1 text-indigo-600 dark:text-indigo-400">
                {state?.adminUserCount}
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="relative w-full sm:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all dark:text-white"
                />
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing {filteredUsers?.length} results
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Identity</th>
                    <th className="px-6 py-4 font-semibold">Access Level</th>
                    <th className="px-6 py-4 font-semibold">
                      Registration Date
                    </th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers?.length > 0 ? (
                    filteredUsers?.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${
                                user.role === "admin"
                                  ? "bg-indigo-600 dark:bg-indigo-500"
                                  : "bg-slate-400 dark:bg-slate-600"
                              }`}
                            >
                              <img
                                src={user.avatar}
                                alt="user"
                                className="rounded-full h-full w-full"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 dark:text-slate-200">
                                {user.username}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                              user.role === "admin"
                                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {moment(user.createdAt).format("ll")}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setDeleteId(user._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete User"
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
                        className="px-6 py-12 text-center text-slate-400 dark:text-slate-600 italic"
                      >
                        No users found.
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-transparent dark:border-slate-800">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <button
                onClick={() => setDeleteId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Confirm Removal
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {state.users.find((u) => u._id === deleteId)?.username}
              </span>
              ? Their account data will be permanently purged from the system.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
