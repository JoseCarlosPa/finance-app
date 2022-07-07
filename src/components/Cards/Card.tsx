import React from 'react'

const Card = () =>{
  return (
    <div
      className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
      <div className="relative overflow-hidden rounded-2xl">
                    <span
                      className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-dark-gray opacity-80"></span>
        <div className="relative z-10 flex-auto p-4">
          <i className="p-2 text-white fas fa-wifi"></i>
          <h5
            className="pb-2 mt-6 mb-12 text-white">4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
          <div className="flex">
            <div className="flex">
              <div className="mr-6">
                <p className="mb-0 leading-normal text-white text-size-sm opacity-80">Card Holder</p>
                <h6 className="mb-0 text-white">Jack Peterson</h6>
              </div>
              <div>
                <p className="mb-0 leading-normal text-white text-size-sm opacity-80">Expires</p>
                <h6 className="mb-0 text-white">11/22</h6>
              </div>
            </div>
            <div className="flex items-end justify-end w-1/5 ml-auto">
              <img className="w-3/5 mt-2" src="../assets/img/logos/mastercard.png" alt="logo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card)