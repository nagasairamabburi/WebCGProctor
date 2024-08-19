import express from "express";
import Exam from "../models/exam.js";
import upload from "../middleware/multer.js";
import { uploadToCloudinary } from "../services/cloudinaty.js";

const router = express.Router();

router.post("/submit-exam", upload.single("video"), async (req, res) => {
  try {
    const { studentInfo, answers, reason, correct, questions } = req.body;
    const { name, registerNo } = JSON.parse(studentInfo);
    const exam = new Exam({
      studentName: name,
      registerNo,
      answers: JSON.parse(answers),
      startTime: new Date(Date.now() - 3600000), // Assuming 1-hour exam
      endTime: new Date(),
      status: reason,
      correct,
      questions,
      videoPath: req.file.path,
    });

    await exam.save();
    res.status(201).json({ message: "Exam submitted successfully" });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ message: "Error submitting exam", error });
  }
});

router.get("/student-results", async (req, res) => {
  try {
    const exams = await Exam.find({}).sort({ startTime: -1 });
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Error fetching results", error });
  }
});

export default router;
