import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  

  const handleDeleteResume = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (!confirmDelete) return;
  
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(id));
  
      // Refresh list
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };
  

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  // Calculate stats
  const totalResumes = allResumes?.length || 0;
  const recentResumes = allResumes?.filter((resume) => {
    const updatedDate = moment(resume.updatedAt);
    const weekAgo = moment().subtract(7, "days");
    return updatedDate.isAfter(weekAgo);
  }).length || 0;
  const lastUpdated = allResumes?.[0]?.updatedAt
    ? moment(allResumes[0].updatedAt).fromNow()
    : "No activity";

  // Get current hour for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const statsData = [
    {
      title: "Total Resumes",
      value: totalResumes,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
    },
    {
      title: "Updated This Week",
      value: recentResumes,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
    },
    {
      title: "Last Activity",
      value: lastUpdated,
      isText: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
    {
      title: "Templates Used",
      value: totalResumes > 0 ? Math.min(totalResumes, 5) : 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
  ];

  const quickTips = [
    { icon: "✨", text: "Use action verbs to describe achievements" },
    { icon: "📊", text: "Quantify results when possible" },
    { icon: "🎯", text: "Tailor your resume for each job" },
    { icon: "📝", text: "Keep it concise - 1-2 pages max" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50/30">
        {/* Background Decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "blob 7s infinite" }}
          />
          <div
            className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "blob 7s infinite 2s" }}
          />
        </div>

        <div className="relative z-10 px-4 md:px-6 lg:px-8 py-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {getGreeting()}! 👋
                </h1>
                <p className="text-gray-500 mt-2">
                  Ready to create your perfect resume? Let&apos;s get started!
                </p>
              </div>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%]"></div>
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Resume
                </span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {stat.title}
                </div>
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r ${stat.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              </div>
            ))}
          </div>

          {/* Quick Tips Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-1">
              <div className="bg-white rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Quick Tips for a Great Resume</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
                    >
                      <span className="text-xl">{tip.icon}</span>
                      <span className="text-sm text-gray-700">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Your Resumes
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {totalResumes === 0
                  ? "Create your first resume to get started"
                  : `You have ${totalResumes} resume${totalResumes > 1 ? "s" : ""}`}
              </p>
            </div>
            {totalResumes > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span>Sorted by recent</span>
              </div>
            )}
          </div>

          {/* Resume Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-6">
            {/* Add New Resume Card */}
            <div
              className="group h-[300px] flex flex-col gap-4 items-center justify-center bg-white rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
              onClick={() => setOpenCreateModal(true)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LuCirclePlus className="text-2xl text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  Add New Resume
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Start from scratch or template
                </p>
              </div>
              <div className="flex items-center gap-1 text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Get Started</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {allResumes?.map((resume, index) => (
              <div
                key={resume?._id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>

                <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                  {/* 🗑 DELETE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteResume(resume?._id);
                    }}
                    className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-red-100 shadow opacity-0 group-hover:opacity-100 transition"
                    title="Delete Resume"
                  >
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-1-3H10a1 1 0 00-1 1v2h6V5a1 1 0 00-1-1z"
                      />
                    </svg>
                  </button>

                  {/* Thumbnail */}
                  <div className="relative h-[180px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                    {resume?.thumbnailLink ? (
                      <img
                        src={resume.thumbnailLink}
                        alt={resume.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <button
                        onClick={() => navigate(`/resume/${resume?._id}`)}
                        className="px-4 py-2 bg-white rounded-lg text-purple-600 font-medium text-sm hover:bg-purple-50 transition-colors"
                      >
                        Edit Resume
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-purple-700 transition-colors">
                      {resume.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {resume?.updatedAt
                          ? moment(resume.updatedAt).format("Do MMM YYYY")
                          : "Not updated"}
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient */}
                  <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            ))}


            {/* Empty State */}
            {allResumes && allResumes.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                  <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No resumes yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Create your first resume to showcase your skills and experience to potential employers.
                </p>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Resume
                </button>
              </div>
            )}
          </div>

          {/* Pro Tips Banner */}
          {totalResumes > 0 && totalResumes < 3 && (
            <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-6 md:p-8">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">
                    💡 Pro Tip: Multiple Versions
                  </h3>
                  <p className="text-white/90">
                    Create different versions of your resume for different job types to increase your chances!
                  </p>
                </div>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="flex-shrink-0 px-6 py-3 bg-white rounded-xl font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateResumeForm />
        </div>
      </Modal>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}
      </style>
    </DashboardLayout>
  );
};

export default Dashboard;
