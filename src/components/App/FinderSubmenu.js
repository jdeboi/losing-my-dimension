import React from 'react';
import ListItem from './ListItem';

class FinderSubmenu extends React.Component {

  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isVisible: false
      })
    }
  }

  toggleHidden () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    var title = this.props.title;
    var icon= "";
    if (title === "") {
      icon = <i className={this.props.icon}></i>
    }
    const specialClass = this.props.specialClass;
    const listItems = this.props.listItems;
    return (
      <li className={`expandable ${specialClass} ${this.state.isVisible ? 'selected': ''}`} onClick={this.toggleHidden} ref={this.setWrapperRef}><span id="pageTitle">{title}</span>
      {icon}
      <div className={`submenu ${this.state.isVisible ? 'visible': ''}`}>
      <ul>
      {listItems.map(item => <ListItem key={item.title} title={item.title} shortcut={item.shortcut} link={item.link} />)}
      </ul>
      </div>
      </li>
    );
  }


}

export default FinderSubmenu
