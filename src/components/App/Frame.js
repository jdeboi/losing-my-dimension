import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';

class Frame extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.dim = {
      frameWidth : this.props.width,
      frameHeight : this.props.height,
      x: this.props.x,
      y: this.props.y
    };

    this.state = {
      isVisible : true,
      isMinimized: false,
      frameWidthPX : this.props.width + "px",
      frameHeightPX : this.props.height + "px"
    }

    this.toggleMaximized = this.toggleMaximized.bind(this);
    this.toggleMinimzed = this.toggleMinimzed.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);

    this.wrapper = React.createRef();
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  toggleClosed() {
    console.log("CLOSE")
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  toggleMinimzed() {
    console.log("MINI")
    this.setState({
      isMinimized: !this.state.isMinimized
    })
  }

  toggleMaximized() {
    this.setState({
      isMaximized: !this.state.isMaximized
    })

    if (this.state.isMaximized) {
      this.setState({
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      })
    }
    else {
      this.setState({
        width: this.dim.frameWidth + "px",
        height:this.dim.frameHeight + "px",
      })
    }
  }

  render() {
    const parser = new DOMParser();
    var title = this.props.title;
    if (title === "") {
      const parsedString = parser.parseFromString(this.props.icon, 'text/html');
      title = parsedString.body.innerHTML;
    }

    var classn = "Frame";
    if (!this.state.isVisible) {
      classn += " hidden";
    }
    else if (this.state.isMinimized) {
      classn += " minimized";
    }

    if (this.state.isMaximized) {
      classn += " maximized";
    }

    var frameStyle = {
      width: this.state.frameWidthPX,
      height: this.state.frameHeightPX
    }

    var contentVisibility = {
      display: this.state.isMinimized ? "none" : "block"
    }

    //https://github.com/STRML/react-draggable

    return (

      <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: this.dim.x, y: this.dim.y}}
      position={null}
      grid={[1, 1]}
      scale={1}
      cancel=".close, .minimize, .zoom"
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}
      nodeRef={this.wrapper}
      >
      <div ref={this.wrapper} className={classn} style={frameStyle} >
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
      <div className="content" style={contentVisibility}>
      {this.props.content}
      </div>
      </div>
      </div>
      </Draggable>

    );
  }

  closeFrame() {

  }
}



export default Frame
