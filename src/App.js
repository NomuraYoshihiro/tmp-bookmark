/*global chrome*/
import React, { Component } from 'react';
import AddBookmarkForm from './AddBookmarkForm';
import Bookmarks from './Bookmarks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };

    this.addBookmark = this.addBookmark.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get(['tmpBookmarks'], (result) => {
      const bookmarks = result.tmpBookmarks;
      if (bookmarks && bookmarks.length > 0) {
        this.setState({ bookmarks });
      }
    });
  }

  addBookmark(title, url) {
    const bookmarks = this.state.bookmarks;
    const newBookmarks = [...bookmarks, { title, url }];
    chrome.storage.sync.set({ tmpBookmarks: newBookmarks }, () => {
      this.setState({ bookmarks: newBookmarks });
    });
  }

  removeAll() {
    chrome.storage.sync.clear();
    this.setState({ bookmarks: [] });
  }

  render() {
    const bookmarks = this.state.bookmarks;
    return (
      <div className="container">
        <AddBookmarkForm addBookmark={this.addBookmark} />
        <Bookmarks bookmarks={bookmarks} removeAll={this.removeAll} />
      </div>
    );
  }
}

export default App;
