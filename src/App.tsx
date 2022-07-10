import React from 'react';
import './App.css';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {config} from "./config/config";
import Navigation from "./routes/Navigation";
import {
  RecoilRoot,
} from 'recoil';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);

const App = () => {
  return (
    <RecoilRoot>
      <Navigation/>
    </RecoilRoot>
  );
}

export default App;
