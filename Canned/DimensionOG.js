import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { GridMaterial } from 'babylonjs-materials';
import "./Dimension.css";
import Frame from '../App/Frame';

import BabylonScene from './Babylon.jsx'; // import the component above linking to file we just created.

export default class Viewer extends Component<{}, {}> {
  onSceneMount = (e: SceneEventArgs) => {

    const { canvas, scene, engine } = e;
    const camera = new BABYLON.AnaglyphUniversalCamera("af_cam", new BABYLON.Vector3(0, 1, -25), 0.033, scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    ///////////////////////////////////////////////////////////////////////////////

    // var url = process.env.PUBLIC_URL + "/models/face/"
    // BABYLON.SceneLoader.Append(url, 'me2.obj', scene, function (scene) {
    //   scene.meshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
    // });

    // box.rotation.x = -0.2;
    // box.rotation.y = -0.4;

    var factor = .01;
    var vw = 1920*factor;
    var vh = 1080*factor;



    var vidurl = process.env.PUBLIC_URL + "/videos/gym.mp4";
    var vidurlclouds = process.env.PUBLIC_URL + "/videos/clouds.mp4";
    var vidurlivy = process.env.PUBLIC_URL + "/videos/ivy.mp4";
    var vidurlad = process.env.PUBLIC_URL + "/videos/adrienne480.mov";
    var myPlaneC = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
    var myPlaneL = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
    var myPlaneR = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
    var myPlaneT = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
    var myPlaneB = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);


    myPlaneC.position.z = 0;
    myPlaneC.material = new BABYLON.StandardMaterial("material",scene);
    myPlaneC.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurl, scene, true);
    myPlaneC.material.emissiveColor = new BABYLON.Color3(1,1,1);

    myPlaneL.rotation.y = -Math.PI/2;
    myPlaneL.position.x = -vw/2;
    myPlaneL.position.z = -vw/2;
    myPlaneL.scaling.x = -1;
    myPlaneL.material = new BABYLON.StandardMaterial("material",scene);
    myPlaneL.material.diffuseTexture = myPlaneC.material.diffuseTexture; //= new BABYLON.VideoTexture("video", vidurl, scene, true);
    myPlaneL.material.emissiveColor = new BABYLON.Color3(1,1,1);

    myPlaneR.rotation.y = Math.PI/2;
    myPlaneR.position.x = vw/2;
    myPlaneR.position.z = -vw/2;
    myPlaneR.scaling.x = -1;
    myPlaneR.material = new BABYLON.StandardMaterial("material",scene);
    myPlaneR.material.diffuseTexture = myPlaneC.material.diffuseTexture; //new BABYLON.VideoTexture("video", vidurl, scene, true);
    myPlaneR.material.emissiveColor = new BABYLON.Color3(1,1,1);

    myPlaneT.rotation.x = -Math.PI/2;
    myPlaneT.position.y = vh/2;
    myPlaneT.position.z = -vh/2;
    // myPlaneT.scaling.x = -1;
    myPlaneT.material = new BABYLON.StandardMaterial("material",scene);
    myPlaneT.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlclouds, scene, true);
    myPlaneT.material.emissiveColor = new BABYLON.Color3(1,1,1);

    myPlaneB.rotation.x = Math.PI/2;
    myPlaneB.position.y = -vh/2;
    myPlaneB.position.z = -vh/2;
    myPlaneB.material = new BABYLON.StandardMaterial("material",scene);
    myPlaneB.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlivy, scene, true);
    myPlaneB.material.emissiveColor = new BABYLON.Color3(1,1,1);

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", process.env.PUBLIC_URL +"/textures/heightMap.png", 20, 20, 20, 0, 10, scene, false);
    ground.material = new BABYLON.StandardMaterial("material",scene);
    ground.material.diffuseTexture =  new BABYLON.VideoTexture("video", vidurlivy, scene, true); //new GridMaterial("groundMaterial", scene);
    ground.position.y = -8;
    ground.position.z = -5;
    ground.position.x = -3;
    // let skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    // // box.material.emmisiveColor = new BABYLON.Color3(0, 0.58, 0.86);

    //////////////////////////////////////////////////////////////////////////////



    engine.runRenderLoop(() => {

      if (scene) {
        // box.rotation.x += 0.01;
        // box.rotation.y += 0.01;
        scene.render();
      }
    });
  }

  render() {

    var amzRivSrc="https://www.google.com/maps/embed?pb=!4v1590509408426!6m8!1m7!1sp6tCl3Zc9lfZsb_DPK6k9Q!2m2!1d-5.266725221834397!2d-60.55707408855312!3f41.30506748771662!4f14.732341091107244!5f0.7820865974627469";
    var forestSrc = "https://www.google.com/maps/embed?pb=!4v1590511194403!6m8!1m7!1sP1fAR2hq8C8bOsiSbctSNA!2m2!1d-5.745324306454626!2d-60.46283649726701!3f341.2!4f72.58000000000001!5f0.7820865974627469";
    const dimW = 600;
    const dimH = 450;
    const dimX = (window.innerWidth - dimW)/2;
    const dimY = (window.innerHeight - dimH)/2;

    return (
      <div className="Dimension">
      <BabylonScene onSceneMount={this.onSceneMount} />

      </div>
    )
  }
}
