import React from 'react';
import Header from "../components/Welcome/Header/Header";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
    </div>
  );

}

export default React.memo(Welcome)