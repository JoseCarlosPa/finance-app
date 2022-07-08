import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "../pages/Welcome";
import AuthRoute from "../components/AuthRoute";
import Login from "../pages/Login";
import SingUp from "../pages/SingUp";
import Home from "../pages/Home";
import IndexTools from "../components/Tools/IndexTools";

const Navigation = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/singUp" element={<SingUp/>}/>
        <Route path="/home/*" element={<AuthRoute> <Home/></AuthRoute>}>
          <Route path="tools" element={<IndexTools/>}/>
        </Route>
        <Route path="*" element={<div>No existe esa pagina</div>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default React.memo(Navigation)