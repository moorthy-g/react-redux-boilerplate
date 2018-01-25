import React from 'react';
import ReactDOM from 'react-dom';
import './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getSeconds()
    };
  }
  render() {
    return (
      <h2>This is a static react webpack boilerplate at {this.state.time}</h2>
    );
  }
}

export default App;
