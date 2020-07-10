// import React, { Component } from 'react';
// import * as BABYLON from 'babylonjs';
// import 'babylonjs-loaders';
// import { GridMaterial } from 'babylonjs-materials';
// import "./JungleGyms.css";
// import Frame from '../App/Frame';
// import InstagramEmbed from 'react-instagram-embed';
// import ReactPlayer from 'react-player'
//
// // palm https://poly.google.com/view/ficLBIjGliK
//
//
// import BabylonScene from './Babylon.jsx'; // import the component above linking to file we just created.
//
// export default class Viewer extends Component<{}, {}> {
//   onSceneMount = (e: SceneEventArgs) => {
//
//     const { canvas, scene, engine } = e;
//     const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1, -25), scene);
//     //const camera = new BABYLON.AnaglyphUniversalCamera("af_cam", new BABYLON.Vector3(0, 1, -25), 0.033, scene);
//     camera.setTarget(BABYLON.Vector3.Zero());
//     // camera.attachControl(canvas, true);
//     const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
//     light.intensity = 0.7;
//
//
//     ///////////////////////////////////////////////////////////////////////////////
//
//     var url = process.env.PUBLIC_URL + "/models/palm/"
//     BABYLON.SceneLoader.Append(url, '/QueenPalmTree.obj', scene, function (scene) {
//       scene.meshes[0].scaling = new BABYLON.Vector3(50, 50, 50);
//       scene.meshes[0].position.x = -3;
//       scene.meshes[0].position.z = -8;
//     });
//
//     // box.rotation.x = -0.2;
//     // box.rotation.y = -0.4;
//
//     var factor = .01;
//     var vw = 1920*factor;
//     var vh = 1080*factor;
//
//
//
//     var vidurl = process.env.PUBLIC_URL + "/videos/gym.mp4";
//     var vidurlclouds = process.env.PUBLIC_URL + "/videos/clouds.mp4";
//     var vidurlswings = process.env.PUBLIC_URL + "/videos/swings.mp4";
//     var vidurlivy = process.env.PUBLIC_URL + "/videos/ivy.mp4";
//     var vidurlad = process.env.PUBLIC_URL + "/videos/adrienne480.mov";
//
//     // var myPlaneC = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vh, height: vw}, scene);
//     // var myPlaneC2 = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: 640*factor*2, height: 400*factor*2}, scene);
//
//     var myPlaneL = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
//     var myPlaneR = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
//     // var myPlaneT = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw*3, height: vh*3}, scene);
//     // var myPlaneB = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: vw*3, height: vh*3}, scene);
//
//     var gymMat = new BABYLON.StandardMaterial("material",scene);
//     gymMat.diffuseTexture = new BABYLON.VideoTexture("video", vidurl, scene, true);
//     gymMat.emissiveColor = new BABYLON.Color3(1,1,1);
//
//     // myPlaneC.position.z = -1;
//     // myPlaneC.material = new BABYLON.StandardMaterial("material",scene);
//     // myPlaneC.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlswings, scene, true);
//     // myPlaneC.material.emissiveColor = new BABYLON.Color3(1,1,1);
//
//     // myPlaneC2.position.z = -6;
//     // myPlaneC2.material = new BABYLON.StandardMaterial("material",scene);
//     // myPlaneC2.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlad, scene, true);
//     // myPlaneC2.material.emissiveColor = new BABYLON.Color3(1,1,1);
//
//     myPlaneL.rotation.y = -Math.PI/4;
//     myPlaneL.position.x = -Math.sqrt(2)*vw/2/2;
//     myPlaneL.position.z = 0;
//     myPlaneL.scaling.x = -1;
//     myPlaneL.material = gymMat;
//
//     myPlaneR.rotation.y = Math.PI/4;
//     myPlaneR.position.x = Math.sqrt(2)*vw/2/2;
//     myPlaneR.position.z = 0;
//     myPlaneR.scaling.x = 1;
//     myPlaneR.material = gymMat;
//
//     // myPlaneT.rotation.x = -Math.PI/2;
//     // myPlaneT.position.y = vh/2;
//     // myPlaneT.position.z = -vh/2;
//     // myPlaneT.scaling.x = -1;
//     // myPlaneT.material = new BABYLON.StandardMaterial("material",scene);
//     // myPlaneT.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlclouds, scene, true);
//     // myPlaneT.material.emissiveColor = new BABYLON.Color3(1,1,1);
//
//     // myPlaneB.rotation.x = Math.PI/2;
//     // myPlaneB.position.y = -vh/2;
//     // myPlaneB.position.z = -vh/2;
//     // myPlaneB.material = new BABYLON.StandardMaterial("material",scene);
//     // myPlaneB.material.diffuseTexture = new BABYLON.VideoTexture("video", vidurlivy, scene, true);
//     // myPlaneB.material.emissiveColor = new BABYLON.Color3(1,1,1);
//
//     // var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", process.env.PUBLIC_URL +"/textures/heightMap.png", 20, 20, 20, 0, 10, scene, false);
//     // ground.material = new BABYLON.StandardMaterial("material",scene);
//     // ground.material.diffuseTexture =  new BABYLON.VideoTexture("video", vidurlivy, scene, true); //new GridMaterial("groundMaterial", scene);
//     // ground.position.y = -8;
//     // ground.position.z = -5;
//     // ground.position.x = -3;
//
//     //////////////////////////////////////////////////////////////////////////////
//
//
//
//     engine.runRenderLoop(() => {
//
//       if (scene) {
//         // box.rotation.x += 0.01;
//         // box.rotation.y += 0.01;
//         scene.render();
//       }
//     });
//   }
//
//   render() {
//
//     var amzRivSrc="https://www.google.com/maps/embed?pb=!4v1590509408426!6m8!1m7!1sp6tCl3Zc9lfZsb_DPK6k9Q!2m2!1d-5.266725221834397!2d-60.55707408855312!3f41.30506748771662!4f14.732341091107244!5f0.7820865974627469";
//     var forestSrc = "https://www.google.com/maps/embed?pb=!4v1590511194403!6m8!1m7!1sP1fAR2hq8C8bOsiSbctSNA!2m2!1d-5.745324306454626!2d-60.46283649726701!3f341.2!4f72.58000000000001!5f0.7820865974627469";
//
//     const factor = .3;
//     const dimW = 1080*factor;
//     const dimH = 1920*factor;
//     const dimX = (window.innerWidth - dimW)/2;
//     const dimY = (window.innerHeight - dimH)/2;
//     var videoBackgroundURL = process.env.PUBLIC_URL + "/videos/swings.mp4";
//
//
//     return (
//       <div className="Dimension">
//       <BabylonScene onSceneMount={this.onSceneMount} />
//
//
//
//       <Frame title="jungle gyms" content={
//         /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
//         <ReactPlayer
//         className={"react-player gym"}
//         playing
//         muted
//         loop
//         width={Math.floor(dimW) + "px"}
//         height={Math.floor(dimH) + "px"}
//         url={videoBackgroundURL}
//         />
//       }
//       width={dimW+2} height={dimH+21} x={dimX} y={dimY}
//       />
//
//       </div>
//     )
//   }
// }
