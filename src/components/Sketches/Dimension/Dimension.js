import React, { Component } from 'react';
import './Dimension.css';

import { FreeCamera, HemisphericLight, Vector3, SceneLoader } from 'babylonjs';
import "babylonjs-loaders";
import BabylonScene from '../../Universal/Babylon.jsx'; // ^^ point to file we created above or 'babylonjs-hook' NPM.



const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);


  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  var url = "/models/face/"; // process.env.PUBLIC_URL +
  SceneLoader.Append(url, 'me2.obj', scene, function (scene2) {
    scene2.meshes[0].scaling = new Vector3(50, 50, 50);
    scene2.meshes[0].position.x = -3;
    scene2.meshes[0].position.z = -8;
  });
}


const onRender = scene => {

}

export default () => (
    <div className="Dimension">
        <div className="Frame-box">
        </div>
      {/* <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id='babylon-canvas' />
  */}
</div>
)
