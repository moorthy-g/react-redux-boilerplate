import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, STATE_KEY } from '../state';

export class Seconds extends Component {
  componentDidMount() {
    this.props.updateSeconds();
    setInterval(this.props.updateSeconds, 5000);
  }
  render() {
    return ( <span>{this.props.seconds}</span> )
  }
}

function mapStateToProps(state) {
  return {
    seconds: state[STATE_KEY]
  }
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapStateToDispatch)(Seconds);
