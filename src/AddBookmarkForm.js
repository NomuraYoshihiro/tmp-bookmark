/*global chrome*/
import React, { Component } from 'react';

class AddBookmarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
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

  add() {
    const { title, url } = this.state;
    this.props.addBookmark(title, url);
  }

  render() {
    const { title, url } = this.state;
    const fieldBodyStyle = { flexGrow: 10 };
    return (
      <div style={{width: '100%'}}>
        <div className="field is-horizontal">
          <div className="field-label is-small">
            <label className="label">名前</label>
          </div>
          <div className="field-body" style={fieldBodyStyle}>
            <div className="field has-addons">
              <div className="control">
                <input className="input is-small" type="text" value={title} onChange={this.handleChange} />
              </div>
              <div className="control">
                <button className="button is-primary is-small" type="button" onClick={this.add}>
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
          <div className="field-body" style={fieldBodyStyle}>
            <div className="field">
              <div className="control">
                <input className="input is-small" type="text" defaultValue={url} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBookmarkForm;
