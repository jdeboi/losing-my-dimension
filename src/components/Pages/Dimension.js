import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
// import "@babylonjs/loaders/OBJ";
// import "@babylonjs/loaders/OBJ";
// import { Engine, Scene } from '@babylonjs/core';
//import * as GUI from "babylonjs-gui";

import BabylonScene from './Babylon.jsx'; // import the component above linking to file we just created.
export default class Viewer extends Component<{}, {}> {
  onSceneMount = (e: SceneEventArgs) => {

    const { canvas, scene, engine } = e;
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    ///////////////////////////////////////////////////////////////////////////////


    BABYLON.SceneLoader.Append("./models/face/", 'me2.obj', scene, function (scene) {
      scene.meshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
    });


    //////////////////////////////////////////////////////////////////////////////



    engine.runRenderLoop(() => {

      if (scene) {
        scene.render();
      }
    });
  }
  render() {
    return (
      // <div>
      <BabylonScene onSceneMount={this.onSceneMount} />
      // </div>
    )
  }
}
