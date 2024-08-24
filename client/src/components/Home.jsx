import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegistrationForm from "./RegistrationForm";
import ExamInProgress from "./ExamInProgress";
import ResultsPage from "./ResultsPage";
import AdminDashboard from "./AdminDashboard";
import AdminLoginModal from "./AdminLoginModal";
import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home() {
  const [examState, setExamState] = useState("landing");
  const [studentInfo, setStudentInfo] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate();

  const startExam = (info) => {
    setStudentInfo(info);
    setExamState("inProgress");
  };

  const endExam = (result) => {
    setExamResult(result);
    setExamState("results");
  };

  const submitResults = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submit-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examResult),
      });
      if (response.ok) {
        alert("Results submitted successfully");
        setExamState("landing");
        setStudentInfo(null);
        setExamResult(null);
      } else {
        alert("Failed to submit results");
      }
    } catch (error) {
      console.error("Error submitting results:", error);
      alert("Error submitting results");
    }
  };

  const handleAdminLogin = () => {
    setIsModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setExamState("admin");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setExamState("landing");
  };

  const handleUserLogout=()=>
  {
    navigate("/")
  }
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
     <div className = "app">  
      <main className=" mx-auto p-6">
        <AnimatePresence mode="wait">
          {examState === "landing" && (
            <motion.div
              key="landing"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <section className="text-center space-y-6">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl font-semibold text-gray-700"
                >
                  Welcome to CareerGuru Exam
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-gray-700"
                >
                  Secure, reliable, and easy-to-use platform for online exams.
                  Empower your learning with our tests designed for self-assessment. 
                  These carefully curated tests help you gauge your understanding and 
                  track your progress, enabling continuous improvement and confidence in your knowledge
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className=" flex justify-center gap-5"
                >
                  <button
                    onClick={() => setExamState("registration")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Start Exam
                  </button>
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                    onClick={handleAdminLogin}
                  >
                    Admin Login
                  </motion.button> */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                    onClick={handleUserLogout}
                  >
                    User Logout
                  </motion.button>
                </motion.div>
              </section>
            </motion.div>
          )}
          {examState === "registration" && (
            <motion.div
              key="registration"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <RegistrationForm onStart={startExam} />
            </motion.div>
          )}
          {examState === "inProgress" && (
            <motion.div
              key="inProgress"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ExamInProgress studentInfo={studentInfo} onEnd={endExam} />
            </motion.div>
          )}
          {examState === "results" && (
            <motion.div
              key="results"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ResultsPage examResult={examResult} onSubmit={submitResults} />
            </motion.div>
          )}
          {examState === "admin" && (
            <motion.div
              key="admin"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AdminDashboard onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}

export default Home;
