/*global chrome*/
import React, { Component } from 'react';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  }

  render() {
    const bookmarks = this.props.bookmarks;
    const bookmarkListStyle = { marginTop: '20px', marginLeft: '20px' };
    const menuLabelStyle = { marginBottom: 0 };
    const linkStyle = {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      textAlign: 'left',
    };

    return (
      <div style={bookmarkListStyle}>
        <p className="menu-label" style={menuLabelStyle}>一時ブックマーク</p>
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
