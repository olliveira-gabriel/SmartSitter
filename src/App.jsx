import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/homePage';
import TelaLogin from './Pages/TelaLogin/TelaLogin';
function App() {
 

  return (
    <>
      <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<TelaLogin/>} />
    </Routes>
  </Router>
    </>
  )
}

export default App
