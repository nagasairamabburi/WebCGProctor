import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout.js';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Route>
      )
    );
  return (
    <div>
        <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App;