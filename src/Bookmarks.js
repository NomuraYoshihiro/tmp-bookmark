import React, { Component } from 'react';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bookmarks = this.props.bookmarks;

    return (
      <div>
        {bookmarks.map((item) =>
          <p>{item.title}</p>
        )}
      </div>
    );
  }
}

export default Bookmarks;
