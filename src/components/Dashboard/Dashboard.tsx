import React from 'react';
import Invoices from "../Cards/Invoices";
const Dashboard = () => {

  return (
    <>
      <div className="flex flex-row items-center">
        <Invoices />
      </div>
    </>
  )
}
export default React.memo(Dashboard);