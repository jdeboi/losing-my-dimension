import React from 'react';
import Frame from '../../Universal/Frame/Frame';
import FrameSimple from '../../Universal/Frame/FrameSimple';
import './Spacetimes.css';

import ReactPlayer from 'react-player'

class Spacetimes extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.startTime = 0;

    this.state = {
      currentFrame : 14,
      increasing: true,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentText: "wasted",
      birds: []
    }

    this.setFrame = this.setFrame.bind(this);
    this.setText = this.setText.bind(this);

    this.dimW = [];
    this.dimX = [];
    this.dimY = [];
    for (var i = 1000; i >= 200; i -= 100) {
      this.dimW.push(i);
      this.dimX.push(window.innerWidth/2-i/2);
      this.dimY.push(window.innerHeight/2-i/2);
    }

    let birds = [];
    for (var x = 0; x < 4; x++) {
      for (var y = 0; y < 4; y++){
        // let xp = Math.random()*window.innerWidth;
        // let yp = Math.random()*window.innerHeight/2;
        let xp = x * 100 + y*100;
        let yp = y * 100;
        birds.push({x: xp, y: yp, xd: 1, yd: 1});
      }
    }
    this.state.birds = birds;
    // this.addBirds = this.addBirds.bind(this);
    this.getBird = this.getBird.bind(this);
    this.updateBirds = this.updateBirds.bind(this);

  }


  componentDidMount() {
    this.updateDimensions();
    this.startTime = new Date();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.intervalFrames = setInterval(this.setFrame, 200);
    this.intervalBirds = setInterval(this.updateBirds, 50);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.intervalFrames);
    clearInterval(this.intervalBirds);
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  setText() {
    var words = ["wasted", "days", "are", "days", "wasted"];
    var wordIndex = Math.floor((this.state.currentFrame+1)/2);
    if (wordIndex >= words.length) wordIndex = words.length-1;
    else if(wordIndex < 0) wordIndex = 0;
    var word = words[wordIndex];
    if (word) word = word.toUpperCase();
    this.setState({currentText : word});
  }

  setFrame() {
    // if (new Date() - this.startTime > 4000) {
    //   let r =  Math.floor(Math.random()*8);
    //   this.setState({currentFrame: r});
    //   console.log(r);
    // }
    // else {
    var fr = this.state.currentFrame;
    if (this.state.increasing) {
      fr++;
      if (fr > this.dimW.length) {
        fr = this.dimW.length;
        this.setState({increasing: false});
      }
    } else {
      fr--;
      if (fr < -2) {
        fr = -1;
        this.setState({increasing: true});
      }
    }
    this.setState({currentFrame: fr});
    this.setText();
    // }

  }



  updateBirds() {
    // console.log("update", this.state.birds.length)
    var inc = 3;
    let birds = this.state.birds;
    for (var i = 0; i < birds.length; i++) {
      let bird = birds[i];
      bird.x += bird.xd*inc;
      bird.y += bird.yd*inc;
      if (bird.x > window.innerWidth) {
        bird.xd = -1;
      }
      else if (bird.x < 0) {
        bird.xd = 1;
      }
      if (bird.y > window.innerHeight) {
        bird.yd = -1;
      }
      else if (bird.y < 0) {
        bird.yd = 1;
      }
    }
    this.setState({birds: birds})
  }

  getBird(index) {
    return (
      <FrameSimple title="" content={
        <div   className={"animal bird " + (this.state.birds[index].xd==1?"flipped":"")}></div>
      }
      width={70+2} key={index} height={60+21} px={this.state.birds[index].x} py={this.state.birds[index].y}
      />
    )
  }

  render() {




    return (
      <div className="Spacetimes">
      { <div className="palindrome" style={{visibility: "visible"}}>{this.state.currentText}</div>}
      <div className="Frame-box" style={{visibility: "visible"}}>

      {this.dimW.map((val, index) =>
        <GridFrame title="spacetimes" isMinimized={false} isHidden={this.state.currentFrame < index ? true : false}
        dimW={val} dimH={val} key={index} src={"/images/space/parrot.png"} src2={`/images/space/${val}.png`} dimX={this.dimX[index]} dimY={this.dimY[index]} />
      )}

      <div className="thebirds" style={{visibility: "hidden"}}>
      {this.state.birds.map((pos, index) => {
        var b = this.getBird(index);
        return b;
      })}
      </div>

      </div>
      </div>
    );
  }

}

function GridFrame(props) {
  return (
    <Frame title={props.title}
    isMinimized={props.isMinimized}
    isHidden={props.isHidden}
    content={
      <img
      className={"grid-img"}
      width={props.dimW+"px"}
      height={props.dimH+"px"}
      src={props.src}
      />
    }
    width={props.dimW+2+4} height={props.dimH+21+4} x={props.dimX} y={props.dimY}
    />
  )

}



export default Spacetimes;
