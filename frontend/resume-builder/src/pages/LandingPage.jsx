import React, { useContext, useState } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
     if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const [openFAQ, setOpenFAQ] = useState(null);

const toggleFAQ = (index) => {
  setOpenFAQ(openFAQ === index ? null : index);
};

const faqData = [
  {
    question: "How do I create a resume?",
    answer:
      "Click 'Get Started' and follow the guided form. It helps you fill in sections like education, experience, and skills step-by-step.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes, once you're done editing, click on the export button to instantly download a professional-quality PDF.",
  },
  {
    question: "Is this resume builder free to use?",
    answer:
      "Yes, our core features are completely free. Premium templates and features may be available later.",
  },
  {
    question: "Can I edit my resume after saving?",
    answer:
      "Absolutely. Just log into your account and access your dashboard to edit any of your saved resumes.",
  },
  {
    question: "Do you offer resume templates?",
    answer:
      "Yes, we offer a variety of modern, clean, and professional templates that suit different industries.",
  },
  {
    question: "Is my data safe with ResuMate?",
    answer:
      "Your privacy is our priority. We store your data securely and never share it with third parties.",
  },
];

  return (
    <div className="w-full min-h-full bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
  <div className="flex items-center gap-2 text-xl font-bold">
    <img src="/icon.svg" alt="Logo" className="w-6 h-6" />
    ResuMate
  </div>

  {user ? (
    <ProfileInfoCard />
  ) : (
    <button
      className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
      onClick={() => setOpenAuthModal(true)}
    >
      Login / Sign Up
    </button>
  )}
</header>


        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#a855f7_0%,_#7c3aed_100%)] bg-[length:200%_200%] animate-text-shine">
  Resume Effortlessly
</span>

            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Craft a standout resume in minutes with our smart and intuitive
              resume builder.
            </p>
            <button
                style={{ backgroundColor: '#702977' }}
                 className="text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-2xl font-bold text-center mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
                Update your resume sections with live preview and instant
                formatting.
              </p>
            </div>

            <div className="bg-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                Beautiful Templates
              </h3>
              <p className="text-gray-600">
                Choose from modern, professional templates that are easy to
                customize.
              </p>
            </div>

            <div className="bg-purple-100  p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume instantly as a high-quality PDF with one
                click.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
  <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
  <div className="max-w-3xl mx-auto space-y-4">
    {faqData.map((faq, index) => (
      <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
        <button
          onClick={() => toggleFAQ(index)}
          className="flex justify-between items-center w-full text-left"
        >
          <span className="font-medium text-gray-800">{faq.question}</span>
          <span className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {openFAQ === index && (
          <p className="mt-3 text-gray-600">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</section>

      </div>

    <div className="text-lg bg-gray-50 text-secondary text-center p-5 mt-5 opacity-60">
  2020/ICTS/68_ULH
</div>



      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

