import React, { Component } from 'react';
import "./HardDrives.css";

import { Scene, AnaglyphUniversalCamera, UniversalCamera,PBRMaterial, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, PhotoDome, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../Universal/Babylon.jsx'; // import the component above linking to file we just created.
import { WaterMaterial } from 'babylonjs-materials';

import Frame from '../../Universal/Frame/Frame';
import FrameSimple from '../../Universal/Frame/FrameSimple';

import InstagramEmbed from 'react-instagram-embed';
import ReactPlayer from 'react-player'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// palm https://poly.google.com/view/ficLBIjGliK

var trees = [];
var bottles = [];
var bottle;
var myscene;
var camera;
var water;
var bottleID = 0;

var start;
var changed = false;
var launchingBottles = false;

var scaler = 4;

class HardDrives extends React.Component {

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

    this.state = {
      island : this.beaches[0],
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      urlIndex: 0,
    }

    this.svFrame = {};
    this.svFrame.w = 600*1.1;
    this.svFrame.h = 450*.8*1.1;
    this.svFrame.x = (window.innerWidth - this.svFrame.w)/2;
    this.svFrame.y = (window.innerHeight - this.svFrame.h-30)/2;

    this.controller = {};
    this.controller.w = 250;// 350;
    this.controller.h = 60;
    let bottomRemaining = window.innerHeight - (this.svFrame.y + this.svFrame.h);
    this.controller.y = this.svFrame.h + this.svFrame.y + 30; //this.svFrame.y + this.svFrame.h + (bottomRemaining-(this.controller.h+20))/2;
    this.controller.x =  (window.innerWidth - this.controller.w)/2;

    this.onRender = this.onRender.bind(this);
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // setInterval(() => {
    //   this.setState({svURL: this.islandURLs[this.state.urlIndex++%this.islandURLs.length]})
    // }, 5000)
    this.interval = setInterval(bottleLaunch, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  onSceneReady(scene) {
    start = new Date();
    myscene = scene;
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8*scaler, -5*scaler), 0.033, scene);
    scene.clearColor = Color3.Black();
    // scene.fogMode = Scene.FOGMODE_LINEAR;
    // scene.fogStart = 520.0;
    // scene.fogEnd = 560.0;
    // scene.fogColor = new Color3(0);

    camera.setTarget(new Vector3(0, 8*scaler, 0));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    // camera.inputs.clear();
    // camera.inputs.removeMouse();
    // camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 1.7;


    ///////////////////////////////////////////////////////////////////////////////
    addPalms(scene);

    // Skybox
    var skybox;
    skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/invert/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    // var dome = new PhotoDome("textureName", "/textures/skybox/sky-10.png", {resolution: 32, size: 1000}, scene);

    // Ground
    var groundTexture = new Texture("/textures/black_sand.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 20.0;

    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;

    var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -1;
    ground.rotation.y = Math.PI/2;
    ground.material = groundMaterial;

    // Water
    var waterMesh = Mesh.CreateGround("waterMesh", 512*scaler, 512*scaler, 32, scene, false);
    water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture("/textures/waterbump.png", scene);
    water.windForce = -5;
    water.waveHeight = 0.8;
    water.bumpHeight = 0.3;
    water.waveLength = 0.3;
    // water.colorBlendFactor = 0;
    water.waterColor = new Color3(0, 0, .1);
    water.colorBlendFactor = 0;
    if (skybox) water.addToRenderList(skybox);
    water.addToRenderList(ground);
    // water.addToRenderList();

    waterMesh.material = water;

    addBottles(scene, water);


  }





  onRender(scene) {

    bottles.map((bot, i) => {
      // let time = water._lastTime / 100000;
      // let x = botMesh.position.x;
      // let z = botMesh.position.z;
      bot.position.y = 3+.3*Math.sin((new Date()).getTime()/800);//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
      // bot.position.z += .005;
      // if (i%2 == 0) bot.position.x += .002;
      // else bot.position.x -= .002;

    });

    var i = 0;
    trees.map((tree) => {
      var sign = i % 2== 0 ? 1 : -1;
      tree.rotation.y += .005 * sign;
      i++;
    })

    let t = new Date();
    if (!changed && t - start > 5000) {
      // onInsta();
      changed = true;
    }

    let divFps = document.getElementById("fps");
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }

  getBottleMenu() {
    return (
      <Frame title="" content={
          <div className="controller-bar">
            <Grid container spacing={1}>
              <Grid item  xs={10}>
                <TextField width="100%" id="outlined-basic" label="message the void" variant="outlined" />
              </Grid>
              <Grid item  xs={2}>
                <Button className="bottle-icon" onClick={bottleLaunch} variant="outlined">🍾</Button>
              </Grid>
            </Grid>
          </div>
        }
        width={this.controller.w} height={this.controller.h} x={this.controller.x} y={this.controller.y}
        />
    );
  }

  getIslandButton() {
    return (
      <Frame title="" content={
          <div className="controller-bar">
            <Button className="islandButton" onClick={this.nextIsland.bind(this)} variant="outlined">🏝️</Button>
          </div>
        }
        width={this.controller.w} height={this.controller.h} x={this.controller.x} y={this.controller.y}
        />
    );
  }

  nextIsland() {
    let islandIndex = this.state.urlIndex;
    islandIndex++;
    islandIndex %= this.beaches.length;
    console.log("beaches", this.beaches[islandIndex], islandIndex)
    this.setState({urlIndex: islandIndex, island: this.beaches[islandIndex]});
  }


  render() {
    return (
      <div className="HardDrives">
        <div className="Frame-box">
          <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />
          {/*this.addBirds()*/}

          <Frame title="hard drives on seashores" content={
              <iframe src={this.state.island} width={this.svFrame.w} height={this.svFrame.h} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            }
            width={this.svFrame.w} height={this.svFrame.h} x={this.svFrame.x} y={this.svFrame.y}
            />

          {/*this.getIslandButton()*/}




          {/*   <img src={this.state.island.waterAnimal}  className="animal" />*/}
        </div>
      </div>
    )
  }
}


function addBottles(scene, water) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/models/Corona/"
  SceneLoader.LoadAssetContainer(url, "Corona2.obj", scene, function (container) {
    var meshes = container.meshes;
    var materials = container.materials;

    console.log("meshes", meshes);

    var bottle = meshes[1];
    var diam = 280;
    // bottle.rotation.y = Math.random()*Math.PI*2;
    // bottle.rotation.x = Math.PI;
    // bottle.rotation.z = (-.3+Math.random()*.6);
    // bottle.position.y = 2//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
    // bottle.position.x = Math.random()*diam-diam/2;
    // bottle.position.z = Math.random()*diam-diam/2;
    //


    // bottle.scaling = new Vector3(.15, .15, .15);
    // bottles.push(bottle);
    container.addAllToScene();  // Adds all elements to the scene


    water.addToRenderList(bottle);


    for (let i = 1; i < 20; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[0];
      copy.rotation.y = Math.random()*Math.PI*2;
      copy.rotation.x = Math.PI;
      copy.rotation.z = (-.3+Math.random()*.6);


      copy.position.y = 2//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
      copy.position.x = Math.random()*diam-diam/2;
      copy.position.z = Math.random()*diam-diam/2;

      bottles.push(copy);
      water.addToRenderList(copy);
    }

  });

}

function bottleAdd(index) {
  if (launchingBottles) {

    // for (var i = 0; i < 20; i++) {
    // var newInstance = bottle.createInstance(index);
    // newInstance.rotation.y = Math.random()*Math.PI*2;
    // newInstance.rotation.x = -Math.PI/2;
    // newInstance.rotation.z = Math.PI/2;//+ (-.3+Math.random()*.6);
    // // newInstance.isVisible = false;
    //
    // // newInstance.scaling = new Vector3(.15, .15, .15);
    // //
    // var diam = 80;
    // newInstance.position.y = 2//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
    // newInstance.position.x = Math.random()*diam-diam/2;
    // newInstance.position.z = Math.random()*diam-diam/2;
    // bottles.push(newInstance);
    // water.addToRenderList(newInstance);

  }
}

function bottleLaunch() {
  if (launchingBottles){
    // var bot = bottles[bottleID%bottles.length];
    // bot.position.x = camera.position.x;
    // bot.position.z = camera.position.z;
    // bot.position.y = 1;
    // bot.isVisible = true;
    // water.addToRenderList(bot);
    // bottleID++;
  }

}

// function prepareBottle(botMesh, scene, water, mat) {
//   let dis = 2+ Math.random()*18;
//   let ang = Math.random()*2*Math.PI;
//   botMesh.position.x = dis * Math.cos(ang);
//   botMesh.position.y = 3;
//   botMesh.position.z = dis * Math.sin(ang);
//   botMesh.rotation.y = Math.random()*Math.PI*2;
//   botMesh.rotation.x = 0;
//   botMesh.rotation.z = Math.PI/2;//+ (-.3+Math.random()*.6);
//
//   let i = 0;
//   bottles.push(botMesh);
//   water.addToRenderList(botMesh);
// }

function addPalms(scene) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/models/palm/"
  SceneLoader.LoadAssetContainer(url, "QueenPalmTree.obj", scene, function (container) {
    var meshes = container.meshes;
    var materials = container.materials;

    // let positions = [{x: -5, y: 0, z: -2},{x: 5, y: 0, z: -2}, {x: 8, y: 0, z: -6}, {x: -8, y: 0, z: -6}, {x: -10, y: 0, z: -8}, {x: 10, y: 0, z: -8}]
    let positions = [{x: -5, y: 0, z: -2},{x: 5, y: 0, z: -2}, {x: 4, y: 0, z: -10}, {x: -4, y: 0, z: -10}]

    meshes[1].rotation.y = 0;
    meshes[1].scaling = new Vector3(scaler, scaler, scaler);
    meshes[1].position.x = positions[0].x*scaler;
    meshes[1].position.y = positions[0].y*scaler;
    meshes[1].position.z = positions[0].z*scaler;

    trees.push(meshes[1]);

    container.addAllToScene();  // Adds all elements to the scene
    water.addToRenderList(trees[0]);

    for (let i = 1; i < positions.length; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[1];
      copy.rotation.y = Math.PI*1.5;
      copy.position.x = positions[i].x*scaler;
      copy.position.z = positions[i].z*scaler;
      trees.push(copy);
      water.addToRenderList(copy);
    }

  });

}

export default HardDrives;
