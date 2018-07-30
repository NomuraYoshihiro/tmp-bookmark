/*global chrome*/
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      bookmarks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
  }

  componentDidMount() {
    chrome.tabs.query({ active: true }, (tabs) => {
      const tab = tabs[0];
      this.setState({title: tab.title, url: tab.url});
    });

    chrome.storage.sync.get(['tmpBookmarks'], (result) => {
      const bookmarks = result.tmpBookmarks;
      if (bookmarks && bookmarks.length > 0) {
        this.setState({ bookmarks });
      }
    });
  }

  handleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  addBookmark() {
    const { title, url, bookmarks } = this.state;
    const newBookmarks = [...bookmarks, { title, url }];
    chrome.storage.sync.set({ tmpBookmarks: newBookmarks }, () => {
      this.setState({ bookmarks: newBookmarks });
    });
  }

  render() {
    const { title, url, bookmarks } = this.state;
    return (
      <div>
        <input type="text" value={title} onChange={this.handleChange} />
        <input type="text" defaultValue={url} />
        <button type="button" onClick={this.addBookmark}>追加</button>
        {bookmarks.map((item) =>
          <p>{item.title}</p>
        )}
      </div>
    );
  }
}

export default App;
