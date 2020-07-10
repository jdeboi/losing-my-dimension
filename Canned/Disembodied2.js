import React from 'react';
import Frame from '../App/Frame';
import './Disembodied.css';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player'

class MacbookAir extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  render() {

    return (
      <div className="Disembodied">
      <footer>
      <img className="zoom-left" src="/images/zoom/left.png" />
      <img className="zoom-mid" src="/images/zoom/mid.png" />
      </footer>
      </div>
    );
  }

}



export default MacbookAir;
