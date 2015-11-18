//Comment.jsx

import React from 'react';

export default class Comment extends React.Component {

  render() {
    return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span/>{this.props.text}
        </div>
    );
  }

}