import React, {useCallback, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Reply} from "heroicons-react";
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {db} from "../App";
import {collection, getDocs,doc, setDoc} from 'firebase/firestore'
const SingUp = ()=>{

  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMssg,setErrorMssg] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const userCollectionsRef = collection(db,'users')

  const signInWithGoogle = async () => {
    setAuthing(true)
    signInWithPopup(auth, new GoogleAuthProvider()).then(async userCredential => {
      const user = userCredential.user
      const data = await getDocs(userCollectionsRef)
      const emails = data.docs.map((doc)=>({...doc.data()}))
      if(emails.find(email => email.email === user.email)){
        navigate('/home/dashboard')
      }else{
        await setDoc(doc(db,'users',user.uid),{id: user.uid, email: user.email,global_debt:0, global_income: 0})
        navigate('/home/dashboard')
      }
    }).catch(error => {
      console.error(error)
      setAuthing(false)
    })
  }

  const handleOnClick = useCallback(() => {
    return signInWithGoogle()
  }, [])

  const handleRegister = useCallback((event:any) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth,email,password).then(async (userCredential) => {
      const user = userCredential.user
      await setDoc(doc(db,'users',user.uid),{id: user.uid, email: user.email,global_debt:0, global_income: 0})
      navigate('/home/dashboard')
    }).catch((error)=>{
      setError(true)
      setErrorMssg(error.message)
    })

  },[auth, email, navigate, password, userCollectionsRef])

  return(
    <div>
      <div className="flex justify-center items-center">
        <div className="lg:w-full xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white lg:px-12 -ml-96">
            <Link to="/" aria-label="Inicio">
              <div className="cursor-pointer flex items-center">
                <Reply/>
                <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold ">FinanceAPP</div>
              </div>
            </Link>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl ">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Registrate</h2>

            <div className="mt-12">
              <form onSubmit={handleRegister}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">Correo electronico</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Ejemplo: example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Contraseña
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    min="6"
                    onChange={(event) => setPassword(event.target.value)}
                    required/>
                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                    Registrarse
                  </button>
                  <button type="button" disabled={authing} onClick={handleOnClick} className="mt-3 bg-gray-50 text-blue-700 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-200 hover:text-white
                                shadow-lg">
                    <div className="flex flex-row justify-center items-center">
                      <div>Registrate con Google </div>
                      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                           className="ml-4 ">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                          <path fill="#4285F4"
                                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                          <path fill="#34A853"
                                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                          <path fill="#FBBC05"
                                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                          <path fill="#EA4335"
                                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                        </g>
                      </svg>
                    </div>
                  </button>

                </div>
              </form>
              <div className="mt-4 w-full flex justify-center items-center">
                {error && <span className="text-red-500">{errorMssg}</span>}
              </div>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                ¿Ya  tienes una cuenta? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                                              href="/login">Inicia Sesion</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export  default  React.memo(SingUp)