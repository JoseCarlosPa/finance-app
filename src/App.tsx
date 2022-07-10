import React from 'react';
import './App.css';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {config} from "./config/config";
import Navigation from "./routes/Navigation";


const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);


const App = () => {
  return (
    <Navigation />
  );
}

export default App;
