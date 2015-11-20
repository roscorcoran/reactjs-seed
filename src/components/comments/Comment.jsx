//Comment.jsx

import React from 'react';

export default class Comment extends React.Component {

  render() {
    return (
        <div className="comment">
            <p className="commentAuthor">
              {this.props.author}
            </p>
            <div className="comment--wrapper"><p className="comment--text">{this.props.text}</p></div>
        </div>
    );
  }

}