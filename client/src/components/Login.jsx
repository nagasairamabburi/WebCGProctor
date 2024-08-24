import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const navigate=useNavigate();

    const handleLogin=()=>
    {
        navigate("/home");
    }
    
  return (
    <div>
 
     <div className="p-3 mt-3" >
      <form className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          // value={email}
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
          // value={password}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
    </div>
    {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 mx-auto"
                    onClick={handleGoBack}
                  >
                   Go Back
     </motion.button> */}
    </div>
  )
}

export default Login