import React from "react";

function Question({ question, onAnswer, selectedAnswer }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-2">{question.category}</h3>
      <p className="mb-4">{question.question}</p>
      {question.options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswer(option)}
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
