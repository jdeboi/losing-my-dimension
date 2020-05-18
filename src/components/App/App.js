import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from './Header';
import HomePage from '../Pages/HomePage';
import Dimension from '../Pages/Dimension';
import MacbookAir from '../Pages/MacbookAir';
import About from '../Pages/About';
import ClickMe from '../Pages/ClickMe';
import NotFound from '../Pages/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/losing-my-dimension" component={Dimension} />
        <Route  path="/macbook-air" component={MacbookAir} />
        <Route  path="/click-me-baby" component={ClickMe} />
        <Route  path="/words" component={About} />
        <Route  component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
