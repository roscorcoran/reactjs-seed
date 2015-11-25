//CommentBox.jsx

import React from 'react';
import $ from 'jquery';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentStore from './stores/CommentStore';
import CommentActions from './actions/CommentActions';

/**
 * Retrieve the current Comments from the CommentStore
 */
function getCommentState() {
  return CommentStore.getAll();
}

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: getCommentState()
    };

    // Bind callback methods to make `this` the correct context.
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CommentStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      data: getCommentState()
    });
  }

  _handleCommentSubmit(comment) {
    CommentActions.create(comment.author, comment.text);
  }

  render() {
    return (
        <div className="commentBox">
          <h2>Comments</h2>
          <hr />
          <CommentList data={this.state.data}/>
          <hr />
          <CommentForm onCommentSubmit={this._handleCommentSubmit}/>
        </div>
    );
  }
}

