import React from 'react'

const Invoices = () => {
  return (
    <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
      <div
        className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
          <div className="flex flex-wrap -mx-3">
            <div className="flex items-center flex-none w-1/2 max-w-full px-3">
              <h6 className="mb-0">Invoices</h6>
            </div>
            <div className="flex-none w-1/2 max-w-full px-3 text-right">
              <button
                className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75">View
                All
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4 pb-0">
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">March, 01, 2020</h6>
                <span className="leading-tight text-size-xs">#MS-415646</span>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $180
                <button
                  className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-size-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                  <i className="mr-1 fas fa-file-pdf text-size-lg"></i> PDF</button>
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">February, 10,
                  2021</h6>
                <span className="leading-tight text-size-xs">#RV-126749</span>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $250
                <button
                  className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-size-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                  <i className="mr-1 fas fa-file-pdf text-size-lg"></i> PDF</button>
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">April, 05, 2020</h6>
                <span className="leading-tight text-size-xs">#FB-212562</span>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $560
                <button
                  className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-size-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                  <i className="mr-1 fas fa-file-pdf text-size-lg"></i> PDF</button>
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">June, 25, 2019</h6>
                <span className="leading-tight text-size-xs">#QW-103578</span>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $120
                <button
                  className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-size-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                  <i className="mr-1 fas fa-file-pdf text-size-lg"></i> PDF</button>
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 bg-white border-0 rounded-b-inherit rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">March, 01, 2019</h6>
                <span className="leading-tight text-size-xs">#AR-803481</span>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $300
                <button
                  className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-size-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                  <i className="mr-1 fas fa-file-pdf text-size-lg"></i> PDF</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Invoices)