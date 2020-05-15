import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';

const windowStyle = {
  width: "100px",
  height: "100px"
}

class Frame extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    windowStyle.width = this.props.width;
    windowStyle.height = this.props.height;
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };



  render() {
    return (
      <div className="Frame">
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[1, 1]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <div className="window" style={windowStyle}>
          <div className="titlebar handle">
            <div className="buttons">
              <div className="close">
                <a className="closebutton" href="#"><span><strong>x</strong></span></a>

              </div>
              <div className="minimize">
                <a className="minimizebutton" href="#"><span><strong>&ndash;</strong></span></a>

              </div>
              <div className="zoom">
                <a className="zoombutton" href="#"><span><strong>+</strong></span></a>

              </div>
            </div>
            {this.props.title}
          </div>
          <div className="content">
            <p>{this.props.content}</p>
          </div>
        </div>
      </Draggable>
      </div>
    );
  }

}

export default Frame
