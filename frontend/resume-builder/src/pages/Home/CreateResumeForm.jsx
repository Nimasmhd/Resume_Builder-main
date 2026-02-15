import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title");
      return;
    }

    setError("");
    setIsLoading(true);

    //Create Resume API Call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const templateSuggestions = [
    { icon: "💼", label: "Professional Resume" },
    { icon: "🎨", label: "Creative Resume" },
    { icon: "💻", label: "Tech Resume" },
    { icon: "📊", label: "Business Resume" },
  ];

  return (
    <div className="w-[90vw] md:w-[480px] p-8 flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 mb-4 shadow-lg shadow-purple-500/30">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Create New Resume
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Give your resume a title to get started. You can edit all details later.
        </p>
      </div>

      <form onSubmit={handleCreateResume} className="space-y-5 relative z-10">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume Title
          </label>
          <div className="relative group">
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Eg: Mike's Resume"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-focus-within:opacity-10 transition-opacity pointer-events-none"></div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {templateSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setTitle(suggestion.label)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  title === suggestion.label
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Create Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative group overflow-hidden px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0]" style={{ transition: "background-position 0.5s ease" }}></div>
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Resume
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </button>

        {/* Features List */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">What you&apos;ll get:</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "✨", text: "Professional templates" },
              { icon: "📝", text: "Easy editing tools" },
              { icon: "📤", text: "PDF export" },
              { icon: "💾", text: "Auto-save feature" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg text-xs">
                  {feature.icon}
                </span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Bottom decoration */}
      <div className="flex justify-center gap-1 mt-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 1 ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CreateResumeForm;
