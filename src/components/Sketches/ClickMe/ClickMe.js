import React from 'react';
import Frame from '../../Universal/Frame/Frame';
import './ClickMe.css';
import Chat from './Chat';

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
    var dimW = Math.floor(64*8+16*2);
    var dimH = Math.floor(730);
    var dimX = (window.innerWidth - dimW)/2;
    var dimY = (window.innerHeight - dimH)/2;

    return (
      <div className="ClickMe">
        <div className="Frame-box">
        {/*<Frame title="click me, baby" content={}
        width={dimW+2} height={dimH+21} x={dimX} y={dimY}
        />
       */}


        <Frame title="I got the feels" content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
        <Chat />
        }
        width={dimW} height={dimH} x={dimX} y={dimY}
        />
      </div>
      </div>
    );
  }

}

export default ClickMe;
