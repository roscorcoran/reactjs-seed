/*
 * CommentStore
 * */

var CommentDispatcher = require('../dispatcher/CommentDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _comments = [{
  "author": "Ros Corcoran",
  "text": "Hey there!"
},{
  "author": "Commander Hadfield",
  "text": "Hey there Ros!"
}];

/**
 * Create a Comment.
 * @param  {string} author The author of the Comment
 * @param {string} text The comment text
 */
function create(author, text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _comments.push({
    id: id,
    author: author,
    text: text
  });
}

var CommentStore = assign({}, EventEmitter.prototype, {
  

  /**
   * Get the entire collection of Comments.
   * @return {object}
   */
  getAll: function() {
    return _comments;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
CommentDispatcher.register(function(action) {
  var text, author;
  
  if(action.actionType == CommentConstants.COMMENT_CREATE){
    text = action.text.trim();
    author = action.author.trim();

    if (text !== '' && author !== '') {
      create(author, text);
      CommentStore.emitChange();
    }
  }
});

module.exports = CommentStore;
