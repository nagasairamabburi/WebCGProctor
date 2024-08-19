import React from "react";

function ExamStart({ onStart }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Exam</h2>
      <p className="mb-4">
        You will have 1 hour to complete the exam. Good luck!
      </p>
      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Exam
      </button>
    </div>
  );
}

export default ExamStart;
