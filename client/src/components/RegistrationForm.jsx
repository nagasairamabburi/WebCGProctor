import React, { useState } from "react";

function RegistrationForm({ onStart }) {
  const [name, setName] = useState("");
  const [registerNo, setRegisterNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ name, registerNo });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="registerNo" className="block mb-2">
          Register Number:
        </label>
        <input
          type="text"
          id="registerNo"
          value={registerNo}
          onChange={(e) => setRegisterNo(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Exam
      </button>
    </form>
  );
}

export default RegistrationForm;
