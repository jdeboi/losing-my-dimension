import React from 'react';
import {Link} from 'react-router-dom';

class ListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;
    const parser = new DOMParser();
    const shortcut = this.props.shortcut;
    const parsedString = parser.parseFromString(shortcut, 'text/html');
    const decodedString = parsedString.body.innerHTML;
    const classn = shortcut !== '' ? 'shortcut': '';
    const link = this.props.link;

    if (link !== '') {
      return (
        <Link to={link}>
        <li key={title} className={classn} shortcut={decodedString}>{title}</li>
        </Link>
      );
    }
    return (
      <li key={title} className={classn} shortcut={decodedString}>{title}</li>
    );
  }
}

export default ListItem
