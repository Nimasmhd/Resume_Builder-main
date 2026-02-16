import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        onClose(); // ✅ close modal
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
    <div className="w-full max-w-md mx-auto p-8 flex flex-col justify-center relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <button
    type="button"
    onClick={onClose}
    className="absolute top-4 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
  >
    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
      {/* Header */}
<div className="text-center mb-6 relative z-10">
  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 mb-4 shadow-lg shadow-purple-500/30">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </div>

  {/* ONLY Functional Close Button */}
 

  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
    Create New Resume
  </h3>

  <p className="text-sm text-gray-500 mt-2">
    Give your resume a title to get started. You can edit all details later.
  </p>
</div>

      <form onSubmit={handleCreateResume} className="space-y-5 relative z-10">

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Resume Title
          </label>

          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Eg: Mike's Resume"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Quick suggestions:</p>

          <div className="flex flex-wrap gap-2">
            {templateSuggestions.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTitle(item.label)}
                className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-purple-100"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
        >
          {isLoading ? "Creating..." : "Create Resume"}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
