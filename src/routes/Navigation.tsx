import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "../pages/Welcome";
import AuthRoute from "../components/AuthRoute";
import Login from "../pages/Login";
import SingUp from "../pages/SingUp";
import Home from "../pages/Home";
import Tools from "../pages/Tools";
import Recovery from "../pages/Recovery";
import Certificates from "../components/Tools/Certificates/Certificates";
import FutureValue from "../components/Tools/FutureValue/FutureValue";
import PresentValue from "../components/Tools/PresentValue/PresentValue";
import Bills from "../pages/Bills";
import CreditCards from "../pages/CreditCards";
import Dashboard from "../components/Dashboard/Dashboard";
import ActivePasive from "../pages/ActivePasive";

const Navigation = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/singUp" element={<SingUp/>}/>
        <Route path="/recovery" element={<Recovery/>}/>
        <Route path="/home/*" element={<AuthRoute> <Home/></AuthRoute>}>
          <Route path="dashboard" element={<Dashboard/>}></Route>
          <Route path="calculo-de-bonos" element={<Certificates/>}/>
          <Route path="valor-futuro" element={<FutureValue/>}></Route>
          <Route path="valor-presente" element={<PresentValue/>}></Route>
          <Route path="herramientas" element={<Tools/>}></Route>
          <Route path="gastos" element={<Bills/>}></Route>
          <Route path="tarjetas" element={<CreditCards/>}></Route>
          <Route path="activos-pasivos" element={<ActivePasive/>}></Route>
        </Route>
        <Route path="*" element={<div>No existe esa pagina</div>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default React.memo(Navigation)