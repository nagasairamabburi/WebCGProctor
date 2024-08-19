import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  studentName: String,
  registerNo: String,
  answers: Object,
  startTime: Date,
  endTime: Date,
  status: String,
  videoPath: String,
  questions: Number,
  correct: Number,
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
