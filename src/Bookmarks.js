/*global chrome*/
import React, { Component } from 'react';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleAllRemove = this.handleAllRemove.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  }

  handleAllRemove() {
    this.props.removeAll();
  }


  render() {
    const bookmarks = this.props.bookmarks;
    const bookmarkListStyle = { marginTop: '20px', marginLeft: '20px' };
    const menuLabelStyle = { marginBottom: 0 };
    const clearButtonStyle = {
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '2px',
    };
    const linkStyle = {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      textAlign: 'left',
    };

    return (
      <div style={bookmarkListStyle}>
        <span className="menu-label" style={menuLabelStyle}>一時ブックマーク</span>
        <span className="button is-danger" style={clearButtonStyle} onClick={this.handleAllRemove}>
          全消去
        </span>
        <ul>
          {bookmarks.map((item) =>
            <li>
              <a
                className="button is-text is-small is-fullwidth"
                style={linkStyle}
                href={item.url}
                onClick={this.handleClick}
              >
                {item.title}
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Bookmarks;
