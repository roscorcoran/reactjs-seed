//CommentBox.jsx

import React from 'react';
import $ from 'jquery';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        "author": "Ros Corcoran",
        "text": "Hey there!"
      },{
        "author": "Commander Hadfield",
        "text": "Hey there Ros!"
      }]
    };

    // Bind callback methods to make `this` the correct context.
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    if (this.props.poll) {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
  }

  render() {
    return (
        <div className="commentBox">
          <h2>Comments</h2>
          <hr />
          <CommentList data={this.state.data}/>
          <hr />
          <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        </div>
    );
  }
}

