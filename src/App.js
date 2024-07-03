import './App.css';
import HomePage from './pages/HomePage';
import BottomNavigator from './components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
import Login from './login/Login';
import Register from './login/Register';
import Reset from './login/Reset';
import Pages from './pages/Pages';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';

function App() {

  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

  return (
    <>
     <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/home" element={<Pages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
