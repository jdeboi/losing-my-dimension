import React from 'react';
import Frame from '../../Universal/Frame/Frame';
import './MacbookAir.css';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player'

class MacbookAir extends React.Component {
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

    var videoDimURL = process.env.PUBLIC_URL + "/videos/noframe.mp4";
    var videoBackgroundURL = process.env.PUBLIC_URL + "/videos/clouds3d.mp4";
    var factor = .5;
    var dimW = Math.floor(1680*factor);
    var dimH = Math.floor(1080*factor);
    var dimX = (window.innerWidth - dimW)/2;
    var dimY = (window.innerHeight - dimH)/4;

    var dimSmallW = 250;
    var dimSmallH = 85-21;
    var dimSmallX = (window.innerWidth - dimSmallW)/2;
    var bottomRemaining = window.innerHeight - (dimY + dimH);
    var dimSmallY = dimY + dimH + (bottomRemaining-(dimSmallH+20))/2;

    return (
      <div className="MacbookAir">
      <div className="Frame-box">
      {/*<ReactPlayer
        className={"react-player clouds"}
        playing
        muted
        loop
        width="100%"
        height="100%"
        url={videoBackgroundURL}
        playbackRate={this.state.videoSpeed}
        />*/}
        <video autoPlay muted loop className="clouds">
        <source src={videoBackgroundURL} type="video/mp4" ></source>
        Your browser does not support HTML5 video.
        </video>
        <Frame title="macbook air" content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
          <ReactPlayer
          className={"react-player mainContent"}
          playing
          muted
          loop
          width={dimW}
          height={dimH}
          url={videoDimURL}
          playbackRate={this.state.videoSpeed}
          />
        }
        width={dimW+2} height={dimH} x={dimX} y={dimY}
        />
        <Frame title="" icon="&#58160;" content={<div className="sliderBox"><ContinuousSlider callback={this.setSpeed} /></div>}
        width={dimSmallW} height={dimSmallH} x={dimSmallX} y={dimSmallY}
        />
        </div>
        </div>
      );
    }

  }


  function ContinuousSlider(props) {
    // const classes = useStyles();
    const [value, setValue] = React.useState(1.0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      props.callback(newValue);
    };

    return (
      <div className="Slider">
      <Grid container spacing={2}>
      <Grid item>
      <span className="emoji-slider" role="img" aria-label="cloud">☁️</span>
      </Grid>
      <Grid item xs>
      <Slider value={value} onChange={handleChange} color='primary' aria-labelledby="continuous-slider" step={0.1} min={0.0} max={2.0} defaultValue={1.0} />
      </Grid>
      <Grid item>
      <span className="emoji-slider" role="img" aria-label="dashing away">💨</span>
      </Grid>
      </Grid>
      </div>
    );
  }

  export default MacbookAir;
