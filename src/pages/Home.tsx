import React from 'react';
import NavBar from "../components/Dashboard/NavBar";

const Home = () =>{



  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <NavBar />
      <div className="m-8">
        CONTENIDO
      </div>
    </div>
  );
}

export default React.memo(Home)