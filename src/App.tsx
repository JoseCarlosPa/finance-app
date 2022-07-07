import React from 'react';
import './App.css';
import {initializeApp} from 'firebase/app';
import {config} from "./config/config";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import SingUp from "./pages/SingUp";

initializeApp(config.firebaseConfig)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/home" element={
          <AuthRoute>
            <Home/>
          </AuthRoute>
        }>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/singUp" element={<SingUp/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
