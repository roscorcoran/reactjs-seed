/*
 * CommentActions
 * */

import CommentDispatcher from '../dispatcher/CommentDispatcher';
import CommentConstants from '../constants/CommentConstants';

var CommentActions = {

  /**
   * @param  {string} text
   */
  create: function (author, text) {
    CommentDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_CREATE,
      author: author,
      text: text
    });
  }

};

module.exports = CommentActions;
