//CommentForm.jsx

import React from 'react';

export default class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    // Bind callback methods to make `this` the correct context.
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
  }

  render() {
    return (
        <form className="commentForm pure-form" onSubmit={this.handleSubmit}>
            <fieldset className="pure-group">
              <legend>Make a comment</legend>
              <input type="text" className="pure-input-1-3" placeholder="Your name" ref="author" required/>
              <textarea className="pure-input-1" placeholder="Say it here..." ref="text" required></textarea>
            </fieldset>

            <button type="submit" className="pure-button pure-button-primary" value="Post">Post</button>
        </form>
    );
  }
}