import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function VideoModal({ videoPath, onClose }) {
  const fileName = videoPath.slice(8);
  console.log(fileName);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        className="bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <video controls className="w-full max-w-3xl">
          <source
            src={`http://localhost:5000/api/uploads/${fileName}`}
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch student results from the backend
    const fetchStudentResults = async () => {
      try {
        const response = await fetch(
          "https://exampromter.onrender.com/api/student-results"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setStudents(data);
        } else {
          console.error("Failed to fetch student results");
        }
      } catch (error) {
        console.error("Error fetching student results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentResults();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
        onClick={onLogout}
      >
        Logout
      </motion.button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <span className="ml-4 text-xl font-semibold text-gray-700">
            Loading...
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Name
                </th>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Register No
                </th>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Score
                </th>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Percentage %
                </th>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Start Time
                </th>
                <th className="py-4 px-6 bg-gray-50 font-semibold uppercase text-sm text-gray-700 border-b border-gray-200">
                  Status
                </th>
                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                  Video
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-100"
                >
                  <td className="py-4 px-6 border-b border-gray-200">
                    {student.studentName}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {student.registerNo}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {student.correct}/{student.questions}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {Math.round((student.correct / student.questions) * 100)}%
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {new Date(student.startTime).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <span
                      className={`px-3 py-1 inline-block rounded-full text-sm font-semibold ${
                        student.status === "Exam completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => setSelectedVideo(student.videoPath)}
                    >
                      See Video
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            videoPath={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;
