import React, { Component } from 'react';
import "./WetStreams.css";

///////////////////// Babylon
import { Scene, AnaglyphUniversalCamera, UniversalCamera,PBRMaterial, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../Universal/Babylon.jsx'; // import the component above linking to file we just created.
import { WaterMaterial } from 'babylonjs-materials';

///////////////////// other components
import Frame from '../../Universal/Frame/Frame';
import FrameSimple from '../../Universal/Frame/FrameSimple';
// import InstagramEmbed from 'react-instagram-embed';
import ReactPlayer from 'react-player';
import Playbar from "./Playbar";

///////////////////// material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

///////////////////// p5.js
import P5Wrapper from 'react-p5-wrapper';
import sketch from './wetSketch';
import Stair from './Stair';


// palm https://poly.google.com/view/ficLBIjGliK

var duckies = [];
var bottles = [];
var bottle;
var myscene;
var camera;

var water, waterMesh;
var start;
var changed = false;



class WetStreams extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      deltaPositions: [
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0}
      ],
      isPlaying0: true,
      isPlaying1: true,
      percent0: 0,
      percent1: 1
    }



    this.svFrame = {};
    this.svFrame.w = 350;
    this.svFrame.h = 350;
    // this.svFrame.x = this.bab.x + this.babStyle.height + 50; //(window.innerWidth - this.svFrame.w)/2;
    // this.svFrame.y = this.bab.y - 50; //(window.innerHeight - this.svFrame.h)/2-60;
    this.svFrame.x = (window.innerWidth-this.svFrame.w)*.2;
    this.svFrame.y = (window.innerHeight-30-this.svFrame.h)*.3;

    this.babStyle = {
      height: this.svFrame.h+100,
      width: this.svFrame.w+400
    }
    this.bab = {};
    this.bab.x = this.svFrame.x-50;
    this.bab.y = this.svFrame.y-50;


    // this.onRender = this.onRender.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

  }

  handleDrag = (index, ui) => {
    let dx = ui.deltaX;
    let dy = ui.deltaY;
    // 1. Make a shallow copy of the items
    let dps = [...this.state.deltaPositions];
    // 2. Make a shallow copy of the item you want to mutate
    let dp = {...dps[index]};
    // 3. Replace the property you're intested in
    dp.x += dx;
    dp.y += dy;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    dps[index] = dp;
    // 5. Set the state to our new copy
    this.setState({deltaPositions:dps});
  };


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

    let origins = [];
    let space = 40;
    let startX = (window.innerWidth-3*this.svFrame.w-2*space)/2;
    if (startX < 0) startX = 0;

    let spaceV = 40;
    let startY = (window.innerHeight-60-2*this.svFrame.h-spaceV)/2;
    if (startY < 0) startY = 0;

    for (let i = 0; i < 3; i++) {
      origins[i] = {x: startX + i*(this.svFrame.w + space), y: startY};
      origins[i+3] = {x: startX + i*(this.svFrame.w + space), y: startY + this.svFrame.h + spaceV };
    }

    let imgs = [7, 1, 3, 4, 8, 10];
    let offsets = [{x:215,y:320}, {x:215,y:215}, {x:50,y:195}, {x:140,y:250}, {x:260,y:335}, {x:240,y:315}];
    let velocities = [
      {velX: {min: -.8, max:5}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:2}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:.8}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:.8}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:5}, velY: {min: -.5, max:0}},
      {velX: {min: -.5, max:5}, velY: {min: -.5, max:0}}
    ];
    let degrees = [0, 60, 90, 80, 40, 0];

    return (
      <div className="WetStreams">
        <div className="Frame-box">


          {/* https://media.giphy.com/media/Kk4f3yrTot95K/giphy.gif*/}


          {imgs.map((img, i) => {
            let title = "";
            if (i == 0) title = "wet streams";
            return getShower(i, origins[i].x, origins[i].y, this.svFrame.w, this.svFrame.w, img, this.handleDrag, title);
          })};


          <P5Wrapper className="p5sketch" sketch={sketch}
            origins={origins}
            offsets={offsets}
            velocities={velocities}
            deltas={this.state.deltaPositions}
            degrees={degrees}
            />


        </div>
      </div>
    )
  }
}

function getShower(id, x, y, w, h, img, dragHandler, title) {
  return(
    <Frame key={id} id={id} onDrag={dragHandler} title={title} content={
        <div className={id==5?"showerhead flippedX":"showerhead"}>
          <img src={"/images/tub/" + img + ".png"} />
        </div>
      }
      width={w} height={h} x={x} y={y}
      />
  )

}


export default WetStreams;
