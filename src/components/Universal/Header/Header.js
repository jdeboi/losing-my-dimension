import React from 'react';
import './Header.css';
import FinderSubmenu from './FinderSubmenu';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTimeString: 0
    }

    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    //"sad fountains"
    const finderMenuItems = [
      {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;1"},
      {title: "macbook air", link:"/macbook-air", shortcut: "&#x2318;2"},
      {title: "I got the feels", link:"/i-got-the-feels", shortcut: "&#x2318;3"},
      {title: "spacetimes", link:"/spacetimes", shortcut: "&#x2318;4"},
      {title: "hard drives on seashores", link:"/hard-drives-on-seashores", shortcut: "&#x2318;5"},
      {title: "mars", link:"/mars", shortcut: "&#x2318;6"},
      {title: "jungle gyms", link:"/jungle-gyms", shortcut: "&#x2318;7"},
      {title: "wet streams", link:"/wet-streams", shortcut: "&#x2318;8"},
    ];

    const hamburgerMenuItems = [
      {title: "gimme deets", link:"/words", shortcut: "&#128221&#128222"},
    ]

    return (

      <header className="Header menuTheme">
        <ul className="left">
          <li className="apple">
            <i className="fas fa-toilet-paper"></i>
          </li>
          <FinderSubmenu title="losing my dimension" specialClass="bold" listItems={finderMenuItems} />
        </ul>
        <ul className="right">
          <li><a href="https://www.instagram.com/jdeboi" target='_blank' rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
          <li id="volume-icon-li" className="expandable"><i className="fa fa-volume-off" id="volume-icon"></i>
          <div className="submenu">
            <ul className="volume">
              <li className="volume">
                <div>
                  <input type="range" min="0" max="100" defaultValue="0" id="volume" />
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li><span id="clock">{this.state.currentTimeString}</span></li>
        {/* <li><a href="https://jdeboi.com/" target='_blank'>jdeboi</a></li>*/}
        <FinderSubmenu title="" icon="fa fa-bars" specialClass="" listItems={hamburgerMenuItems} />
      </ul>
    </header>
  );
}

updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

  // var currentSeconds = currentTime.getSeconds();
  // currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  var timeOfDay = (currentHours < 12) ? "AM" : "PM";
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
  currentHours = (currentHours === 0) ? 12 : currentHours;

  var shortDays = [
    'Sun', //Sunday starts at 0
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  var x = currentTime.getDay(); //This returns a number, starting with 0 for Sunday
  var day = (shortDays[x]);

  var currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;

  this.setState({currentTimeString: currentTimeString});
}

}

export default Header
