import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from '../Header/Header';

// Sketches
import HomePage from '../../Sketches/HomePage/HomePage';
import Dimension from '../../Sketches/Dimension/Dimension';
import MacbookAir from '../../Sketches/MacbookAir/MacbookAir';
import ClickMe from '../../Sketches/ClickMe/ClickMe';
import JungleGyms from '../../Sketches/JungleGyms/JungleGyms';
import HardDrives from '../../Sketches/HardDrives/HardDrives';
import Spacetimes from '../../Sketches/Spacetimes/Spacetimes';
import Mars from '../../Sketches/Mars/Mars';
import WetStreams from '../../Sketches/WetStreams/WetStreams';

// Pages
import About from '../../Pages/About';
import NotFound from '../../Pages/NotFound';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[300] },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <div className="BackHeader"></div>
        <Header />
        <div className="App-content inner-outline">

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route  path="/losing-my-dimension" component={Dimension} />
            <Route  path="/macbook-air" component={MacbookAir} />
            <Route  path="/i-got-the-feels" component={ClickMe} />
            <Route  path="/jungle-gyms" component={JungleGyms} />
            <Route  path="/hard-drives-on-seashores" component={HardDrives} />
            <Route  path="/spacetimes" component={Spacetimes} />
            <Route  path="/mars" component={Mars} />
            <Route  path="/wet-streams" component={WetStreams} />
            <Route  path="/words" component={About} />
            <Route  component={NotFound} />
          </Switch>
          <div id="fps">0</div>

        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
