/*global chrome*/
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    chrome.tabs.query({ active: true }, (tabs) => {
      const tab = tabs[0];
      this.setState({title: tab.title, url: tab.url});
    });
  }

  handleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  addBookmark() {
    console.log('add bookmark');
  }

  render() {
    const { title, url } = this.state;

    return (
      <div className="App">
        <input type="text" value={title} onChange={this.handleChange} />
        <input type="text" defaultValue={url} />
        <button type="button" onClick={this.addBookmark}>追加</button>
      </div>
    );
  }
}

export default App;
