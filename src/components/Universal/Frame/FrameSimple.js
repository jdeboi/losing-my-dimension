import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';

class FrameSimple extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);


  }

  render() {
    let toolBarH = 30;
    
    const parser = new DOMParser();
    var title = this.props.title;

    var sty = {
      width: this.props.width,
      height: this.props.height + toolBarH,
      left: this.props.px,
      top: this.props.py
    }
    return (
      <div className="Frame FrameSimple" style={sty}>
      <div className="window">
        <div className="titlebar handle">
          <div className="buttons">

            <div className="close" onClick={this.toggleClosed}>
            <div className="closebutton" ><span><strong>x</strong></span></div>
            </div>

            <div className="minimize" onClick={this.toggleMinimzed}>
            <div className="minimizebutton"><span><strong>&ndash;</strong></span></div>
            </div>

            <div className="zoom" onClick={this.toggleMaximized}>
            <div className="zoombutton"><span><strong>+</strong></span></div>
            </div>

          </div>
        {this.props.title}
        </div>

        <div className="content">
        {this.props.content}
        </div>

      </div>
      </div>

    );
  }

  closeFrame() {

  }
}



export default FrameSimple
