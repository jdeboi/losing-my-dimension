import React from 'react';
import {Link} from 'react-router-dom';
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
    const finderMenuItems = [
      {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;1"},
      {title: "macbook air", link:"/macbook-air", shortcut: "&#x2318;2"},
      {title: "click me, baby", link:"", shortcut: "&#x2318;3"},
      {title: "facetime spacetime", link:"", shortcut: "&#x2318;4"},
      {title: "hard drives on seashores", link:"", shortcut: "&#x2318;5"},
      {title: "sad fountains", link:"", shortcut: "&#x2318;6"},
      {title: "jungle gyms", link:"", shortcut: "&#x2318;7"},
    ];

    const hamburgerMenuItems = [
      {title: "gimme deets", link:"/words", shortcut: "&#128221&#128222"},
    ]

    return (

      <header className="Header">
      <ul className="left">
      <li className="apple">
      <i className="fas fa-toilet-paper"></i>
      </li>
      <FinderSubmenu title="losing my dimension" specialClass="bold" listItems={finderMenuItems} />
      </ul>
      <ul className="right">
      <li><a href="https://www.instagram.com/jdeboi" target='_blank'><i className="fa fa-instagram"></i></a></li>
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
    var currentSeconds = currentTime.getSeconds();
    var shortDays = [
      'Sun', //Sunday starts at 0
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    var longDays = [
      'Sunday', //Sunday starts at 0
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var d = new Date(); //This returns Wed Apr 02 2014 17:28:55 GMT+0800 (Malay Peninsula Standard Time)
    var m = d.getMonth();
    var month = (months[m]);
    var date = d.getDate();
    var year = d.getFullYear();
    var x = d.getDay(); //This returns a number, starting with 0 for Sunday

    var day = (shortDays[x]);
    var longDay = (longDays[x]);

    // Pad the minutes and seconds with leading zeros, if required
    var currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    var currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    var currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    var currentHours = (currentHours === 0) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;
    var longTimeString = longDay + ", " + month + " " + date + ", " + year;
    // $("#clock").html(currentTimeString);
    // $("#date").html(longTimeString);
    this.setState({currentTimeString: currentTimeString});
  }

}

export default Header
