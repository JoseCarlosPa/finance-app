import React from 'react';
import {Reply} from "heroicons-react";

const Bills = () => {
  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Gastos</h1>
      </div>
      <div className="flex flex-col">

      </div>
    </>
  );
}

export default React.memo(Bills);