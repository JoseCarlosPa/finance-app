import React from 'react';
import Header from "../components/Welcome/Header";
import HeroHome from "../components/Welcome/HeroHome";


const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="flex-grow">
        <HeroHome />
      </main>
    </div>
  );

}

export default React.memo(Welcome)