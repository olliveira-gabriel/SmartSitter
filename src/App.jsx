import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/homePage';
import TelaLogin from './Pages/TelaLogin/TelaLogin';
import Telacadastro from './Pages/TelaCadastro/Telacadastro';
function App() {
 

  return (
    <>
      <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<TelaLogin/>} />
      <Route path="/cadastro" element={<Telacadastro/>}/>
    </Routes>
  </Router>
    </>
  )
}

export default App
