import React from 'react';
import {Outlet} from "react-router-dom";
import { motion } from 'framer-motion';
import './RootLayout.css';

function RootLayout() {
  return (
    <div>
        <header className=" text-white py-6 shadow-lg">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center"
        >
          CareerGuru Exam
        </motion.h1>
      </header>
      <div>
       <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout;