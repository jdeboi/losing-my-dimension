import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';

class Frame extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.toolBarH = 26;

    this.dim = {
      frameWidth : this.props.width+2,
      frameHeight : this.props.height + this.toolBarH,
      x: this.props.x,
      y: this.props.y
    };

    this.state = {
      isVisible : true,
      isMinimized: false,
      frameWidthPX : this.props.width + 2 + "px",
      frameHeightPX : this.props.height + this.toolBarH + "px"
    }

    this.toggleMaximized = this.toggleMaximized.bind(this);
    this.toggleMinimzed = this.toggleMinimzed.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);
    this.customDrag = this.customDrag.bind(this);

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

    let mini = !this.state.isMinimized;
    let fh = this.dim.frameHeight + "px";
    console.log("MINI")
    if (mini) fh = "22px";
    this.setState({
      isMinimized: mini,
      frameHeightPX: fh
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

  customDrag(e, ui) {
    if(this.props.onDrag) {

      // let x = ui.x;
      // let y = ui.y;

      this.props.onDrag(this.props.id, ui);

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
    if (this.props.isHidden | !this.state.isVisible) {
      classn += " hidden";

    }
    else if (this.props.isMinimized | this.state.isMinimized) {
      classn += " minimized";
    }

    if (this.state.isMaximized) {
      classn += " maximized";
    }


    var contentVisibility = {
      display: this.state.isMinimized ? "none" : "block"
    }

    //https://github.com/STRML/react-draggable

    var pos = this.props.px ? {x: this.props.px, y: this.props.py}: null;
    return (

      <Draggable
        axis="both"
        handle={this.props.handle?".handle, " + this.props.handle: ".handle"}
        defaultPosition={{x: this.dim.x, y: this.dim.y}}
        position={pos}
        grid={[1, 1]}
        scale={1}
        bounds=".Frame-box"
        cancel=".close, .minimize, .zoom"
        onStart={this.handleStart}
        onDrag={this.props.onDrag?this.customDrag:this.handleDrag}
        onStop={this.handleStop}
        nodeRef={this.wrapper}
        >
        <div ref={this.wrapper} className={classn} style={{width: this.state.frameWidthPX,height: this.state.frameHeightPX}} >
          <div className={this.props.window?"window stair-window":"window"}>
            <div className="titlebar menuTheme handle">
              <div className="titleTxtContainer"><div className="titleTxt">{this.props.title}</div></div>

              <div className="buttons">
                <div className="close circleButton" onClick={this.toggleClosed}>
                  <div className="closebutton" ><div className="innerC"></div></div>

                </div>
                <div className="minimize circleButton" onClick={this.toggleMinimzed}>
                  <div className="minimizebutton"><div className="innerC"></div></div>

                </div>
                <div className="zoom circleButton" onClick={this.toggleMaximized}>
                  <div className="zoombutton"><div className="innerC"></div></div>

                </div>
              </div>
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

//<span className="circleTxt"><strong>x</strong></span>
//<span className="circleTxt"><strong>&ndash;</strong></span>
//<span className="circleTxt"><strong>+</strong></span>


export default Frame
