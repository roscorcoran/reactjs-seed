/*
 * Button
 * */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class purebutton extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('event', event);
    this.setState({disabled: true});
  }

  render() {

    var classes = classNames({
      'pure-button': true,
      'pure-button-primary': true,
      'pure-button-disabled': this.props.disabled
    });

    return (
        <button onClick={this.handleClick} type="submit" className={classes} value={this.props.value}>
          {this.props.text}
        </button>
    );
  }
}

purebutton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  value: PropTypes.string,
  text: PropTypes.string
};


purebutton.defaultProps = {
  active: false,
  disabled: false,
  primary: false,
  value: 'Post',
  text: 'Post'
};


//ReactDOM.render(
//    <pureButton />,
//    document.getElementById('button12')
//);