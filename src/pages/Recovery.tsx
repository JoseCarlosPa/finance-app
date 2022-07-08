import React, {useCallback, useState} from 'react'
import {Link} from "react-router-dom";
import {Reply} from "heroicons-react";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Recovery = () => {

  const [email, setEmail] = useState<string>('')
  const auth = getAuth()
  const MySwal = withReactContent(Swal)


  const handleForgotPassword = useCallback((event:any) => {
      event.preventDefault()
      sendPasswordResetEmail(auth,email).then(()=>{
        MySwal.fire('Enviado con exito!',
          'Revisa tu bandeja de entrada para recuperar tu contraseña!',
          'success').then(() => {
        })
      })

  },[auth, email])


  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="lg:w-full xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white lg:px-12 -ml-96">
            <Link to="/login" aria-label="Inicio">
              <div className="cursor-pointer flex items-center">
                <Reply/>
                <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold ">Iniciar Sesion</div>
              </div>
            </Link>
          </div>
          <div className="mt-10">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Recuperar Contraseña</h2>

            <div className="mt-12">
              <form onSubmit={handleForgotPassword}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">Correo electronico</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Ejemplo: example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                </div>
                <div className="mt-10">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                    Enviar
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default React.memo(Recovery)