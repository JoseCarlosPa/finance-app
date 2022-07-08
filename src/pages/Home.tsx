import React from 'react';
import NavBar from "../components/Dashboard/NavBar";
import {Outlet} from "react-router-dom";

const Home = () =>{

  return (
    <div className="min-h-screen flex flex-row bg-gray-100 grid grid-cols-12">
      <div className="col-span-2">
        <NavBar />
      </div>
      <div className="col-span-10 m-8">
        <Outlet />
      </div>
    </div>
  );
}

export default React.memo(Home)