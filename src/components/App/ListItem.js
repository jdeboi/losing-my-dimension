import React from 'react';
import {Link} from 'react-router-dom';

const ListItem = (props) => {


    const title = props.title;
    const parser = new DOMParser();
    const shortcut = props.shortcut;
    const parsedString = parser.parseFromString(shortcut, 'text/html');
    const decodedString = parsedString.body.innerHTML;
    const classn = shortcut !== '' ? 'shortcut': '';
    const link = props.link;

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

export default ListItem
