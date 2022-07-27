import React from 'react'

const Pasives = () => {

  return (
    <div className="w-full max-w-full px-3 lg:flex-none h-96">
      <div
        className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
          <div className="flex flex-wrap -mx-3">
            <div className="flex items-center flex-none w-1/2 max-w-full px-3">
              <h6 className="mb-0">Pasivos</h6>
            </div>
            <div className="flex-none w-1/2 max-w-full px-3 text-right">
              <button
                className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-blue-500 text-blue-500 hover:opacity-75"> + Agregar
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
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $180
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">February, 10,
                  2021</h6>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $250
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">April, 05, 2020</h6>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $560
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">June, 25, 2019</h6>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $120
              </div>
            </li>
            <li
              className="relative flex justify-between px-4 py-2 pl-0 bg-white border-0 rounded-b-inherit rounded-xl text-inherit">
              <div className="flex flex-col">
                <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">March, 01, 2019</h6>
              </div>
              <div className="flex items-center leading-normal text-size-sm">
                $300
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Pasives)