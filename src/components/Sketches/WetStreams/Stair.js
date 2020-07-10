import React from 'react';
import "./Stair.css";
import Frame from '../../Universal/Frame/Frame';

function Stair(props) {
  let numSteps = props.numSteps;
  let steps = [];
  for(let i = 0; i < numSteps; i++) {
    steps.push(i);
  }
  let stepW = props.stepW;
  let stepH = props.stepH;
  let stepDown = props.stepDown;
  return (
    <div className="Stair">
    <Frame title="" content=

      {steps.map((val, i) => {
        let classN = "step";
        if (i == 0) classN += " firstStep"
        if (i == numSteps -1) classN += " lastStep"
        let num = i;
        // let bg = "/images/space/steps/" + (i-1) + ".png";
        // if (i == 0) bg = "/images/space/grid.jpg";
        
        // let bg = `/images/space/deep.png`;
        // bg = "/textures/bluetile.jpg";

        // let bg = "https://media.giphy.com/media/3HoB7BmMnKMdq/giphy.gif"
        // let bg = "https://media.giphy.com/media/Uk6S4C1H2Pc1G/giphy.gif"
        // let bg = "/images/tub/waves.gif"; //waves
        // let bg = "https://media.giphy.com/media/13i9MA8PmVZMzu/giphy.gif"; // stairs
        // let bg = "https://media.giphy.com/media/l4FGzZAnAOXIFenOE/giphy.gif"; // waterfall
        let bg = "https://media.giphy.com/media/jE3MLJEzqh4E8/giphy.gif"
        let factor = 1;
        // let bgpos = "0px 0px";
        // let bgsize = "contain";
        let bgpos =   (-i*stepW) + "px " + (-i*stepDown) + "px";
        let bgsize= (stepW*numSteps*factor) + "px " + ((stepH + stepDown*numSteps)*factor) + "px";
        // let bgsize = "500px 500px"//"auto " + (stepH + (stepH-stepDown)*numSteps) + " px";
        return (
          <div className={classN} key={i} style={{width: stepW, height: stepH, top: -30+stepDown*i, left: stepW*i, backgroundImage: `url(${bg})`, backgroundPosition: bgpos, backgroundSize: bgsize}}></div>
        );
      })}
      width={stepW} height={0} x={props.x} y={props.y} window={true} handle={".step"}
      />
    </div>
  );
}

export default Stair;
