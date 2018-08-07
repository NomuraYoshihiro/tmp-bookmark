/*global chrome*/
import React, { Component } from 'react';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleAllRemove = this.handleAllRemove.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  }

  handleAllRemove() {
    this.props.removeAll();
  }

  handleRemove(bookmark) {
    this.props.remove(bookmark);
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
      width: '90%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      textAlign: 'left',
    };

    const deleteIconStyle = { verticalAlign: 'middle' };

    return (
      <div style={bookmarkListStyle}>
        <span className="menu-label" style={menuLabelStyle}>一時ブックマーク</span>
        <span className="button is-danger" style={clearButtonStyle} onClick={this.handleAllRemove}>
          全消去
        </span>
        {bookmarks.map((item) =>
          <div>
            <a
              className="button is-text is-small is-fullwidth"
              style={linkStyle}
              href={item.url}
              onClick={this.handleClick}
            >
              {item.title}
            </a>
            <span
              className="delete is-small"
              style={deleteIconStyle}
              onClick={() => this.handleRemove(item)}
            ></span>
          </div>
        )}
      </div>
    );
  }
}

export default Bookmarks;
