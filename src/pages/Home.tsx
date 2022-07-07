import React from 'react';
import NavBar from "../components/Dashboard/NavBar";
import Card from "../components/Cards/Card";
import Incomes from "../components/Cards/Incomes";
import Invoices from "../components/Cards/Invoices";

const Home = () =>{



  return (
    <div className="min-h-screen flex flex-row bg-gray-100 grid grid-cols-12">
      <div className="col-span-2">
        <NavBar />
      </div>
      <div className="col-span-10 m-8">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-3 mb-4 xl:mb-0 xl:w-1/2 xl:flex-none">
                <div
                  className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
                  <Card />
                </div>
              </div>
              <div className="w-full max-w-full px-3 xl:w-1/2 xl:flex-none">
                <div className="flex flex-wrap -mx-3">
                  <Incomes />
                  <Incomes />
                </div>
              </div>
            </div>
          </div>
          <Invoices />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home)