import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import { connect } from 'react-redux';
import { setNoSketchMusic } from '../../store/actions/music';

import { rooms } from '../sketches/Sketches';

class SketchIndex extends React.Component {

  componentDidMount() {
    this.props.setNoSketchMusic();
  }

  render() {
    const { ui } = this.props;
    let classN = "Page " + ui.size;
    if (ui.hasFooter && ui.orientation === "landscape")
      classN += " landscape";

    return (
      <div className={classN}>
        <div className="About SketchIndex container">
          <h1>losing my dimension</h1>
          <p>visual musings on quarantine, space, and the internet</p>
          <br></br>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                <Link to={"/" + room.link}>{room.title}</Link> <span className="year">{room.year}</span>
              </li>
            ))}
          </ul>
          <br></br>
          <h3>---</h3>
          <p>Jenna deBoisblanc<br></br>MFA Thesis Exhibition, Tulane University, April 2021</p>
        </div>
      </div>
    );
  }
}


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {
    setNoSketchMusic
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(SketchIndex);
