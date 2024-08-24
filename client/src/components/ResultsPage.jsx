import React from "react";
import { motion } from "framer-motion";

function ResultsPage({ examResult }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
   

  const handleGoback=()=>
  {
    window.location.reload();
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Exam Results</h2>
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {examResult.studentName}
        </p>
        <p>
          <strong>Registration Number:</strong> {examResult.registerNo}
        </p>
      </div>
      <div className="mb-4">
        <p>
          <strong>Marks:</strong> {examResult.score} /{" "}
          {examResult.totalQuestions}
        </p>
        <p>
          <strong>Percentage:</strong>{" "}
          {((examResult.score / examResult.totalQuestions) * 100).toFixed(2)}%
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Correct Answers:</h3>
        <ul className="list-disc list-inside">
          {examResult.correctAnswers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p>
          <strong>Submission Time:</strong> {formatDate(examResult.endTime)}
        </p>
      </div>
      <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                    onClick={handleGoback}
                  >
                    Go Back
       </motion.button>

    </div>
  );
}

export default ResultsPage;
