import React from 'react';
import Frame from '../App/Frame';
import './ClickMe.css';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player'

class ClickMe extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      videoSpeed : 1.0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }

    this.setSpeed = this.setSpeed.bind(this);
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

  setSpeed(speed) {
    this.setState({videoSpeed: speed});
  }

  render() {

    var videoDimURL = process.env.PUBLIC_URL + "/videos/justface.mp4";
    var videoBackgroundURL = process.env.PUBLIC_URL + "/videos/clouds3d.mp4";
    var factor = .7;
    var dimW = Math.floor(900*factor);
    var dimH = Math.floor(900*factor);
    var dimX = (window.innerWidth - dimW*2)/3;
    var dimY = (window.innerHeight - dimH)/4;

    var dimXChat = (window.innerWidth - dimW*2)/3*2+dimW;

    return (
      <div className="ClickMe">
        {/*<Frame title="click me, baby" content={}
        width={dimW+2} height={dimH+21} x={dimX} y={dimY}
        />
       */}

        <ReactPlayer
        className={"react-player mainContent"}
        playing
        muted
        loop
        width={dimW}
        height={dimH}
        url={videoDimURL}
        style={{position:"absolute"}}
        playbackRate={this.state.videoSpeed}
        />

        <Frame title="click me, baby" content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
        <div>hello</div>
        }
        width={dimW+2} height={dimH+21} x={dimXChat} y={dimY}
        />
      </div>
    );
  }

}

export default ClickMe;
