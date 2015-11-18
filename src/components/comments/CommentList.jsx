//CommentList.jsx

import React from 'react';
import Comment from './Comment'

export default class CommentList extends React.Component {

  render() {
    var commentNodes = this.props.data.map(function (comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <Comment author={comment.author} text={comment.text} key={index}>
            {comment.text}
          </Comment>
      );
    });
    return (
        <div className="commentList">
          {commentNodes}
        </div>
    );
  }

}