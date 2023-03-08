import React, {useCallback} from 'react'
import {getAuth, signOut} from "firebase/auth";
import {
  Cash,
  CreditCard,
  CubeTransparent,
  CurrencyDollar,
  Home,
  LogoutOutline,
  StatusOnline,
  User
} from "heroicons-react";
import logo from '../../logo.png'

const NavBar = () =>{

  const auth = getAuth()

  const handleOnClick = useCallback(()=>{
    return signOut(auth)
  },[auth])

  return(
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-lg transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent ">
      <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
        <a className="block px-8 py-6 m-0 text-size-sm whitespace-nowrap text-slate-700" href="#"
           target="_blank">
          <img src={logo}
               className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo"/>
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Finance App</span>
        </a>
      </div>
      <div className="flex flex-row justify-start items-center ml-10">
        <StatusOnline className="text-green-400 -mt-1" width="20" height="20" />
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-horizontal-dark"/>

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors"
              href="/home/dashboard">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <Home />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
            </a>
          </li>

          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="/home/tarjetas">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <CreditCard />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Tarjetas</span>
            </a>
          </li>

          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="/home/activos-pasivos">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current stroke-0 text-center xl:p-2.5">
                <Cash />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Activos/Pasivos</span>
            </a>
          </li>
          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="/home/dashboard">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current stroke-0 text-center xl:p-2.5">
                <CubeTransparent />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Inversiones</span>
            </a>
          </li>

          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="/home/gastos">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <CurrencyDollar />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Ingresos/Egresos</span>
            </a>
          </li>

          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="/home/herramientas">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <svg width="12px" height="12px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>settings</title>
                  <g stroke="none"  fill="none">
                    <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(304.000000, 151.000000)">
                          <polygon className="fill-slate-800 opacity-60"
                                   points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"></polygon>
                          <path className="fill-slate-800 opacity-60"
                                d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"></path>
                          <path className="fill-slate-800"
                                d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Herrameintas</span>
            </a>
          </li>

          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 font-bold leading-tight uppercase text-size-xs opacity-60">Paginas de tu Cuenta</h6>
          </li>

          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              href="./pages/profile.html">
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <User />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Perfil</span>
            </a>
          </li>
          <li className="mt-0.5 w-full hover:scale-y-110 duration-300">
            <div className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer" onClick={handleOnClick}>
              <div
                className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <LogoutOutline />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft" >Cerrar Sesion</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>


  );
}

export default React.memo(NavBar)