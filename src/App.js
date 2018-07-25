/*global chrome*/
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    chrome.tabs.query({active: true}, (tabs) => {
      const tab = tabs[0];
      this.setState({url: tab.url});
    });
  }

  render() {
    const url = this.state.url;

    return (
      <div className="App">
        <input type="text" defaultValue={url} />
      </div>
    );
  }
}

export default App;
