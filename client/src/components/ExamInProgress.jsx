import React, { useState, useEffect, useRef } from "react";
import Question from "./Question";

const questions = [
  {
    category: "Aptitude",
    question: "What is 15% of 80?",
    options: ["12", "16", "10", "14"],
    answer: "12",
  },
  {
    category: "Technical",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Multi Language",
      "Hyper Transfer Markup Language",
      "None of the above",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    category: "Coding",
    question: "What will be the output of: console.log(typeof NaN)?",
    options: ["undefined", "object", "number", "NaN"],
    answer: "number",
  },
  {
    category: "Aptitude",
    question:
      "If a car travels at 60 km/h, how far will it travel in 2.5 hours?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    answer: "150 km",
  },
  {
    category: "Technical",
    question: "Which of the following is not a JavaScript data type?",
    options: ["Number", "String", "Boolean", "Character"],
    answer: "Character",
  },
];

function ExamInProgress({ studentInfo, onEnd }) {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examEnded, setExamEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    if (stream) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (timeLeft <= 0) {
      endExam("Time's up");
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        endExam("Tab switching detected");
      }
    };

    const handleCopy = (e) => {
      e.preventDefault();
      endExam("Copying detected");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", handleCopy);

    requestCameraAndMicAccess();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  const requestCameraAndMicAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      startRecording(mediaStream);
    } catch (error) {
      console.error("Error accessing camera and microphone:", error);
      alert(
        "Camera and microphone permissions are required to start the exam."
      );
      endExam("Permissions not granted");
    }
  };

  const startRecording = (mediaStream) => {
    mediaRecorderRef.current = new MediaRecorder(mediaStream);
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start(1000); // Collect 1 second of data at a time

    mediaStream.getTracks().forEach((track) => {
      track.onended = () => {
        endExam("Camera or microphone was disabled");
      };
    });
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const calculateResults = () => {
    const score = questions.reduce((total, question, index) => {
      return total + (answers[index] === question.answer ? 1 : 0);
    }, 0);

    const correctAnswers = questions
      .filter((question, index) => answers[index] === question.answer)
      .map((question) => question.question);

    return {
      studentName: studentInfo.name,
      registerNo: studentInfo.registerNo,
      score,
      totalQuestions: questions.length,
      correctAnswers,
      totalCorrects: correctAnswers.length,
      endTime: new Date(),
      answers,
    };
  };

  const endExam = async (reason = "Exam completed") => {
    setExamEnded(true);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Wait for the last chunk of media data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const examResults = calculateResults();

    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob, "exam_recording.webm");
    formData.append(
      "studentInfo",
      JSON.stringify({
        name: studentInfo.name,
        registerNo: studentInfo.registerNo,
      })
    );
    formData.append("answers", JSON.stringify(examResults.answers));
    formData.append("correct", JSON.stringify(examResults.totalCorrects));
    formData.append("questions", JSON.stringify(examResults.totalQuestions));
    formData.append("reason", reason);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/submit-exam", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        alert("Failed to submit exam data");
      }
      onEnd(examResults);
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Error submitting exam data");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (examEnded) {
    return (
      <div className="text-center text-2xl mt-10">
        The exam has ended. Please wait for your results.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-2xl font-bold mb-6 text-center text-gray-800">
        Exam Progress
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-700">
          Time Remaining: {formatTime(timeLeft)}
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden ml-4">
          <div
            className="bg-blue-500 h-full rounded-full"
            style={{
              width: `${
                ((questions.length - timeLeft / 60) / questions.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {stream && (
        <div className="mb-6">
          <video
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.srcObject = stream;
              }
            }}
            autoPlay
            muted
            className="w-full h-64 rounded-lg shadow-sm"
          />
        </div>
      )}

      <Question
        question={questions[currentQuestion]}
        onAnswer={(answer) => handleAnswer(currentQuestion, answer)}
        selectedAnswer={answers[currentQuestion]}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className={`${
            currentQuestion === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          } font-bold py-2 px-4 rounded-lg shadow`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              endExam();
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
        >
          {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default ExamInProgress;
