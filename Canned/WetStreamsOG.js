import React, { Component } from 'react';
import { Scene, AnaglyphUniversalCamera, UniversalCamera,PBRMaterial, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from './Babylon.jsx'; // import the component above linking to file we just created.

import { WaterMaterial } from 'babylonjs-materials';
import "./WetStreams.css";
import Frame from '../App/Frame';
import FrameSimple from '../App/FrameSimple';
import InstagramEmbed from 'react-instagram-embed';
import ReactPlayer from 'react-player'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import P5Wrapper from 'react-p5-wrapper';
import sketch from './wetSketch';

import Stair from '../App/Stair';

// palm https://poly.google.com/view/ficLBIjGliK

var duckies = [];
var bottles = [];
var bottle;
var myscene;
var camera;

var water, waterMesh;
var start;
var changed = false;



class WetStreamsOG extends React.Component {

  constructor(props) {
    super(props);

    this.sky = "https://www.google.com/maps/embed?pb=!4v1591820298439!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f315.493974142352!4f79.53485037853946!5f0.4125900490817119";
    this.water = "https://www.google.com/maps/embed?pb=!4v1591820453080!6m8!1m7!1sCAoSLEFGMVFpcE5UM1c2VUdrLWNWengzbEVjZUpXUUpOVGFBcnBrRmxOX0RWWFFt!2m2!1d-16.87437024377152!2d168.5315829096921!3f255.14238198590843!4f31.088706413108227!5f0.7820865974627469";
    this.desert = "https://www.google.com/maps/embed?pb=!4v1591823417725!6m8!1m7!1sCAoSLEFGMVFpcFA2ZXdsLTdfUDVzcjhSb0hILXlPV2cxQlBpTm40dmd2MjZGQ2h0!2m2!1d24.432972!2d54.651138!3f12.11108208350993!4f-8.57353950629367!5f0.7820865974627469"
    this.beaches =  [
      "https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
      "https://www.google.com/maps/embed?pb=!4v1591731061550!6m8!1m7!1s14MaFqgTRTaDiBSsL39GpQ!2m2!1d-3.870455013319621!2d-32.43747623434356!3f169.18860029370475!4f3.8811831878503256!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1591731152367!6m8!1m7!1sCAoSLEFGMVFpcE1TWTlDY19DbTZKS3o2a1JwTGVWWkp2cnJKTG9fVERiTDBxb3BZ!2m2!1d9.47087!2d100.053962!3f131.34!4f21.040000000000006!5f0.4000000000000002",

    ];



    this.islandURLs = {
      aus: {
        sv:"https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
        waterAnimal: "https://media.giphy.com/media/VwTPbIxJyN1w4/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/l3Uchq9s6Hx0aK8F2/giphy.gif",
        underAnimal: "https://media.giphy.com/media/3o7btWuHdqixPYqKuQ/giphy.gif"
      },
      amazon: {
        sv: "https://www.google.com/maps/embed?pb=!4v1591729810341!6m8!1m7!1s8KHDdWjHmX-5VUuLadhpoA!2m2!1d-3.138365217661719!2d-60.49319170993962!3f183.4533009061596!4f4.597270194924249!5f0.7820865974627469",
        waterAnimal: "https://media.giphy.com/media/hPLft0bT2HxEA/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/Tk1C1v8qWBocm9ryWx/giphy.gif",
        underAnimal: "https://media.giphy.com/media/r4rma1tDoGRFK/giphy.gif"
      },
      nordic: {
        sv:"https://www.google.com/maps/embed?pb=!4v1591725274284!6m8!1m7!1sCAoSLEFGMVFpcE5WMEpaUDVLcHVJcXl3YmhTcE56d2pOMnRtNkR5OFdWbzhMVDlM!2m2!1d80.1174164!2d17.0557976!3f105.0036195370437!4f0.19994726177958455!5f0.7820865974627469",
        waterAnimal: "https://media.giphy.com/media/2Y8tvawHjIygnQnqVo/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/MRELXooGA4FXOxnoXL/giphy.gif",
        underAnimal: "https://media.giphy.com/media/pJuWoH6laWXN6/giphy.gif"
      }
    };

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

    this.state = {
      island : this.islandURLs.aus,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      urlIndex: 0,
      birds: birds
    }

    this.babStyle = {
      width: 900,
      height: 500
    }
    this.bab = {
      x: (window.innerWidth-this.babStyle.width)/2,
      y: (window.innerHeight-this.babStyle.height)/2-60
    };

    this.svFrame = {};
    this.svFrame.w = 400;
    this.svFrame.h = 400;
    this.svFrame.x = this.bab.x + this.babStyle.height + 50; //(window.innerWidth - this.svFrame.w)/2;
    this.svFrame.y = this.bab.y - 50; //(window.innerHeight - this.svFrame.h)/2-60;

    this.controller = {};
    this.controller.w = 80;
    this.controller.h = 88;
    let bottomRemaining = window.innerHeight - (this.svFrame.y + this.svFrame.h);
    this.controller.y = 500;
    this.controller.x =  this.bab.x;//(window.innerWidth - this.controller.w)/2;



    this.onRender = this.onRender.bind(this);
    this.getBird = this.getBird.bind(this);
    this.updateBirds = this.updateBirds.bind(this);
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // setInterval(() => {
    //   this.setState({svURL: this.islandURLs[this.state.urlIndex++%this.islandURLs.length]})
    // }, 5000)
    // this.interval = setInterval(this.updateBirds, 50);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    // clearInterval(this.interval);
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  onSceneReady(scene) {
    start = new Date();
    myscene = scene;
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(4, -8, -2));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    ///////////////////////////////////////////////////////////////////////////////
    // addDuckies(scene);

    // Skybox
    var skyW = 1000;
    var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/grid", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Ground
    // var groundTexture = new Texture("/textures/grid.jpg", scene);
    // groundTexture.vScale = groundTexture.uScale = 4.0;
    //
    // var groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = groundTexture;
    //
    // var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    // ground.position.y = -1;
    // ground.material = groundMaterial;

    // Water
    waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
    waterMesh.position.y = -9;
    water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture("textures/waterbump.png", scene);
    waterGo();
    water.colorBlendFactor = 0;
    water.addToRenderList(skybox);
    // water.addToRenderList(ground);

    waterMesh.material = water;


  }





  onRender(scene) {

    bottles.map((bot) => {
      // let time = water._lastTime / 100000;
      // let x = botMesh.position.x;
      // let z = botMesh.position.z;
      bot.position.y = 3.5+.4*Math.sin((new Date()).getTime()/700);//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
      bot.position.z += .1;
    });

    var i = 0;
    duckies.map((ducky) => {
      // var sign = i % 2== 0 ? 1 : -1;
      var sign = 1;
      ducky.rotation.y += .005 * sign;
      ducky.position.y = 3.5+.3*Math.sin((new Date()).getTime()/700);
      i++;
    })

    let t = new Date();
    if (!changed && t - start > 5000) {
      // onInsta();
      changed = true;
    }


    let divFps = document.getElementById("fps");
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";

    // this.updateBirds();
  }

  getMenu() {
    return (
      <Frame title="" content={
          <div className="controller-bar">
            <Button className="bottle-icon" onClick={waterStop} variant="outlined">🚿</Button>
          </div>
        }
        width={this.controller.w} height={this.controller.h} x={this.controller.x} y={this.controller.y}
        />
    );
  }

  updateBirds() {
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
        bird.x = 0;
      }
      if (bird.y > window.innerHeight) {
        bird.yd = -1;
        bird.y = window.innerHeight;
      }
      else if (bird.y < 0) {
        bird.yd = 1;
        bird.y = 0;
      }
    }
    this.setState({birds: birds})
  }

  getBird(index) {
    return (
      <FrameSimple title="" content={
          <div   className={"animal bird " + (this.state.birds[index].xd==1?"flipped":"")}></div>
        }
        width={70+2} key={index} height={60} px={this.state.birds[index].x} py={this.state.birds[index].y}
        />
    )
  }

  addBirds() {
    return (
      <div id="birds">
        {this.state.birds.map((pos, index) => {
          return this.getBird(index);
        })};
      </div>
    );
  }


  render() {
    let stairS = 100;
    return (
      <div className="WetStreams">
        <div className="Frame-box">
          <Frame title="" content={
              <BabylonScene style={this.babStyle} className="noSelect" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />
            }
            width={this.babStyle.width+2} height={this.babStyle.height} x={this.bab.x} y={this.bab.y}
            />
          {/*this.addBirds()*/}

          {/* https://media.giphy.com/media/Kk4f3yrTot95K/giphy.gif*/}
          <Frame title="wet streams" content={
              <img src="/images/tub/shower_static.png" />
            }
            width={this.svFrame.w+2} height={this.svFrame.h} x={this.svFrame.x} y={this.svFrame.y}
            />

          {/*this.getMenu()*/}


          <Stair x={this.bab.x - stairS} y={this.bab.y + 1.5*stairS} stepW={stairS} stepH={stairS} numSteps={5} stepDown={stairS*.75} />

          <P5Wrapper className="p5sketch" sketch={sketch} x={this.svFrame.x+90} y={this.svFrame.y+315} />


        </div>
      </div>
    )
  }
}



function addBottles(scene, water) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/models/bottle/"
  SceneLoader.LoadAssetContainer(url, "Bottle.obj", scene, function (container) {
    var meshes = container.meshes;
    var materials = container.materials;

    bottle = meshes[0];

    var mat = new StandardMaterial("sphereMaterial", scene);
    mat.specularTexture = new Texture("/textures/specularglossymap.png", scene);
    mat.specularPower = 64;
    mat.useGlossinessFromSpecularMapAlpha = true;
    mat.diffuseColor = Color3.Black();
    mat.roughness = 3;
    mat.alpha = .7;
    var skyReflect = new CubeTexture("/textures/TropicalSunnyDay", scene);
    mat.reflectionTexture = skyReflect;

    // var mat = new StandardMaterial("blueMat", scene);
    // mat.diffuseColor = new Color3(1, 1, 1);
    // mat.alpha = .5;

    bottle.material = mat;
    // prepareBottle(bottle, scene, water, mat);
    // Adds all elements to the scene
    // container.addAllToScene();
    bottleLaunch();

    // for (var i = 0; i < 20; i++) {
    //   // let copyBot = container.instantiateModelsToScene().rootNodes[0];
    //   var newInstance = meshes[0].createInstance("i" + i);
    //   // newInstance.position.x = i;
    //   prepareBottle(newInstance, scene, water, mat);
    // }

    // copyL.rotation.y = Math.PI*1.5;
    // copyL.position.x = 5;
    // duckies.push(copyL);
    //
    // let copyL2 = container.instantiateModelsToScene().rootNodes[0];
    // console.log("NODES", container.instantiateModelsToScene().rootNodes)
    // copyL2.mesh.isVisible = false;
    // copyL2.rotation.y = Math.PI*1.5;
    // copyL2.position.x = 8;
    // copyL2.position.z = -6;


  });

}

function waterGo() {
  water.windForce = -5;
  water.waveHeight = 0.8;
  water.bumpHeight = 0.1;
  water.waveLength = 0.3;
}

function waterStop() {
  // water.windForce*=2;
  water.waveHeight=0;
  water.bumpHeight*=2;
  // water.waveLength *=2;
}
function bottleLaunch() {
  var newInstance = bottle.createInstance("0");
  newInstance.position.x = camera.position.x;
  newInstance.position.y = 3;
  newInstance.position.z = camera.position.z;
  newInstance.rotation.y = Math.random()*Math.PI*2;
  newInstance.rotation.x = 0;
  newInstance.rotation.z = Math.PI/2;//+ (-.3+Math.random()*.6);
  bottles.push(newInstance);
}

function prepareBottle(botMesh, scene, water, mat) {
  let dis = 2+ Math.random()*18;
  let ang = Math.random()*2*Math.PI;
  botMesh.position.x = dis * Math.cos(ang);
  botMesh.position.y = 3;
  botMesh.position.z = dis * Math.sin(ang);
  botMesh.rotation.y = Math.random()*Math.PI*2;
  botMesh.rotation.x = 0;
  botMesh.rotation.z = Math.PI/2;//+ (-.3+Math.random()*.6);

  // botMesh.material = mat;

  let i = 0;
  // scene.registerBeforeRender(function() {
  //   let time = water._lastTime / 100000;
  //   let x = botMesh.position.x;
  //   let z = botMesh.position.z;
  //   botMesh.position.y = 3.5+.5*Math.sin(time);//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
  // });
  bottles.push(botMesh);
  water.addToRenderList(bottles[bottles.length-1]);
}

function addDuckies(scene) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/models/RubberDuck/"
  SceneLoader.LoadAssetContainer(url, "RubberDuck.obj", scene, function (container) {
    var meshes = container.meshes;
    var materials = container.materials;
    meshes[1].position.x = 0;
    meshes[1].scaling = new Vector3(.5, .5, .5);
    meshes[1].position.y = 7;
    meshes[1].position.z = 10;

    var space = 100;
    var spacing = 10;
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        var newInstance = meshes[1].createInstance("i" + x+y);
        // newInstance.position.x = Math.random()*space-space/2;
        // newInstance.position.z = Math.random()*space-space/2;
        // newInstance.rotation.y = Math.random()*2*Math.PI;
        newInstance.position.x = x*spacing-50;
        newInstance.position.z = y*spacing-50;
        newInstance.rotation.y = 0;
        duckies.push(newInstance);
      }
    }

    //   prepareBottle(newInstance, scene, water, mat);

  });

}

export default WetStreamsOG;
