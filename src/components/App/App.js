import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import Header from './Header';
import HomePage from '../Pages/HomePage';
import Dimension from '../Pages/Dimension';
import MacbookAir from '../Pages/MacbookAir';
import About from '../Pages/About';

function App() {
  return (
    <div className="App">
      <Header />

      <div>
        <Route exact path="/" component={HomePage} />
        <Route  path="/losing-my-dimension" component={Dimension} />
        <Route  path="/macbook-air" component={MacbookAir} />
        <Route  path="/words" component={About} />
      </div>
    </div>
  );
}

export default App;
