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
      <React.Fragment>
        <div className="field is-horizontal">
          <div className="field-label is-small">
            <label className="label">名前</label>
          </div>
          <div className="field-body">
            <div className="field has-addons">
              <div className="control">
                <input className="input is-small" type="text" value={title} onChange={this.handleChange} />
              </div>
              <div className="control">
                <button className="button is-primary is-small" type="button" onClick={this.addBookmark}>
                  追加
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-small">
            <label className="label">URL</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input className="input is-small" type="text" defaultValue={url} disabled />
              </div>
            </div>
          </div>
        </div>
        <div>
          {bookmarks.map((item) =>
            <p>{item.title}</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
