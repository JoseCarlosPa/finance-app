import React from 'react';
import Header from "../components/Welcome/Header";
import HeroHome from "../components/Welcome/HeroHome";
import Features from "../components/Welcome/Features";
import Footer from "../components/Welcome/Footer";


const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="flex-grow">
        <HeroHome />
        <Features />
      </main>
      <Footer />
    </div>
  );

}

export default React.memo(Welcome)