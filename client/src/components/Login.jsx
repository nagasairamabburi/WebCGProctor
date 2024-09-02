import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBRzi40DS9hnrPvnIemI6SSur34z8nIHw",
  authDomain: "careercrew-ca56d.firebaseapp.com",
  databaseURL: "https://careercrew-ca56d-default-rtdb.firebaseio.com",
  projectId: "careercrew-ca56d",
  storageBucket: "careercrew-ca56d.appspot.com",
  messagingSenderId: "756903487544",
  appId: "1:756903487544:web:ca8a68d2af83dc38039ecd",
  measurementId: "G-TJWLSVYJHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        navigate("/home");
      })
      .catch((error) => {
        // Handle login error
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="p-3 mt-3">
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
