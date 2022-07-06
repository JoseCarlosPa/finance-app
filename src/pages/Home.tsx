import React, {useCallback} from 'react';
import {getAuth,signOut} from "firebase/auth";

const Home = () =>{

  const auth = getAuth()

  const handleOnClick = useCallback(()=>{
    return signOut(auth)
  },[auth])

  return (
    <div>
    <p>HOME</p>
      <button onClick={handleOnClick}>Sign Out</button>
    </div>
  );
}

export default React.memo(Home)