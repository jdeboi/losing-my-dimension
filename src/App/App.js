import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import './App.css';

// shared components
import Header from '../components/shared/Header/Header';
import ReactAudioPlayer from 'react-audio-player';

// store
import { connect } from 'react-redux';
import { loadingApp, resizeApp, startComposition } from '../store/actions';
import { hideMenus } from '../store/actions/menuItems';
import { setUserRoom } from '../store/actions/user';

// menu frames
import RoomDecal from '../components/shared/RoomDecal/RoomDecal';

// sketches
import { sketches, getUrl } from '../components/sketches/Sketches';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import Wasted from '../components/sketches/Wasted/Wasted';
import Mars from '../components/sketches/Mars/Mars';
import WetStreams from '../components/sketches/WetStreams/WetStreams';
import Confessional from '../components/sketches/Confessional/Confessional';
import Xfinity from '../components/sketches/Xfinity/Xfinity';
import Flush from '../components/sketches/Flush/Flush';
import Oogle from '../components/sketches/Oogle/Oogle';
import Yosemite from '../components/sketches/Yosemite/Yosemite';
import Blinds from '../components/sketches/Blinds/Blinds';
import ClickMe from '../components/sketches/ClickMe/ClickMe';

// pages
import SketchIndex from '../components/pages/SketchIndex';
import About from '../components/pages/About';
import Statement from '../components/pages/Statement';
import Credits from '../components/pages/Credits';
import NotFound from '../components/pages/NotFound';


window.AWS = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ["App"],
      hasLoadedRoom: false
    };
  }

  componentDidMount() {
    this.props.setUserRoom(this.getRoom(this.props.location.pathname));

    window.addEventListener("resize", this.updateDeviceDimensions);
    window.addEventListener("keydown", this.handleKeyPress);

    this.props.loadingApp();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDeviceDimensions);
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.pageChange();
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const { user } = this.props;
      const { hasLoadedRoom } = this.state;
      if (!hasLoadedRoom && user.room !== "gallery") {
        this.setState({ hasLoadedRoom: true });
        this.props.startComposition();
      }
    }
  }

  pageChange = () => {
    let newPath = this.props.location.pathname;
    this.props.hideMenus();
    const nextRoom = this.getRoom(newPath);
    if (nextRoom !== this.props.user.room) {
      this.props.loadingApp();
      this.setState({ hasLoadedRoom: false });
    }
    this.props.setUserRoom(nextRoom);
  }

  updateDeviceDimensions = () => {
    this.props.resizeApp(window.innerWidth, window.innerHeight);
  }

  addClass = (classn) => {
    let classes = [...this.state.classes];
    classes.push(classn);
    this.setState({ classes });
  }

  removeClass = (classn) => {
    let classes = [...this.state.classes];
    let indexOfClass = classes.indexOf(classn);
    if (indexOfClass > -1) {
      classes.splice(indexOfClass, 1);
      this.setState({ classes });
    }
  }

  getRoom = (path) => {
    var rm = path.substring(1, path.length);

    // the index page takes the gallery's place
    if (rm === "") rm = "gallery";

    const pages = sketches.map((sketch) => sketch.link);
    pages.push("gallery");
    const pages2 = ["statement", "thesis", "bio", "about", "credits"];
    if (!pages.includes(rm) && !pages2.includes(rm)) rm = "";

    return rm;
  }

  getRoomTitle = (path) => {
    var rm = this.getRoom(path);
    rm = rm.replace(/-/g, ' ');
    return rm;
  }

  getStringClasses = () => {
    return this.state.classes.join(" ");
  }

  startMedia = () => {
    this.setState({ hasLoadedRoom: true });
  }

  render() {

    const { ui, music, user } = this.props;
    const appHeaderClass = "App-Header" + (ui.isMobile || ui.hasFooter ? " mobile" : "");
    const currentPage = this.getRoomTitle(this.props.location.pathname);

    return (
      <div className={this.getStringClasses()}>
        <div className={appHeaderClass}>
          <div className="BackHeader"></div>
          <Header currentPage={currentPage} user={this.props.user} isMenuOn={true} />
        </div>
        <div className="App-Content inner-outline">
          <Switch>
            <Route exact path="/" render={() => (<SketchIndex ui={this.props.ui} />)} />

            {/* Sketches */}
            <Route exact path={getUrl("mac")} render={() => (<MacbookAir />)} />
            <Route exact path={getUrl("jung")} render={() => (<JungleGyms />)} />
            <Route exact path={getUrl("hard")} render={() => (<HardDrives />)} />
            <Route exact path={getUrl("wasted")} render={() => (<Wasted />)} />
            <Route exact path={getUrl("esc")} render={() => (<Mars addClass={this.addClass} removeClass={this.removeClass} />)} />
            <Route exact path={getUrl("wet")} render={() => (<WetStreams />)} />
            <Route exact path={getUrl("xfin")} render={() => (<Xfinity />)} />
            <Route exact path={getUrl("cloud")} render={() => (<Confessional cursor={0} />)} />
            <Route exact path={getUrl("flush")} render={() => (<Flush />)} />
            <Route exact path={getUrl("home")} render={() => (<Oogle />)} />
            <Route exact path={getUrl("blind")} render={() => (<Blinds />)} />
            <Route exact path={getUrl("yose")} component={Yosemite} />
            <Route exact path={getUrl("click")} render={() => (<ClickMe addClass={this.addClass} removeClass={this.removeClass} />)} />

            {/* Pages */}
            <Route exact path="/about" render={() => (<About ui={this.props.ui} />)} />
            <Route exact path="/statement" render={() => (<Statement ui={this.props.ui} />)} />
            <Route exact path="/credits" render={() => (<Credits ui={this.props.ui} />)} />

            {/* catch all */}
            <Route path="*" component={NotFound} />
          </Switch>

        </div>
        <RoomDecal startMedia={this.startMedia} hasLoadedRoom={this.state.hasLoadedRoom} />
        {user.comp === null && ui.compositionStarted ?
          <ReactAudioPlayer
            src={music.currentSongTitle}
            autoPlay={true}
            volume={music.isMuted ? 0 : music.volume}
            controls={false}
            loop={true}
          /> : null
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui,
    music: state.music
  }
}

const mapDispatchToProps = () => {
  return {
    setUserRoom,
    resizeApp,
    loadingApp,
    hideMenus,
    startComposition
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(App));
