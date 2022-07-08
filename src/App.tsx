import React from 'react';
import './App.css';
import {initializeApp} from 'firebase/app';
import {config} from "./config/config";
import Navigation from "./routes/Navigation";

initializeApp(config.firebaseConfig)

const App = () => {
  return (
    <Navigation />
  );
}

export default App;
