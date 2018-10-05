import React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import Seconds from 'components/seconds';
import { actions, STATE_KEY } from '../state';
import '../style.less';

const AsyncSeconds = Loadable({
  loader: () => import('components/async-seconds'),
  loading: () => 'Loading...'
});

class App extends React.Component {
  render() {
    return (
      <div>
        <h2 styleName='title'>
          This is a react/redux webpack boilerplate <br />
          Seconds component <Seconds />
        </h2>
        <button onClick={this.props.showAsyncComponent}>Show Async Component</button>
        { this.props.asyncComponent &&
          <h2 styleName='title'>
            Async seconds component <AsyncSeconds />
          </h2>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state[STATE_KEY];
}

export default connect(mapStateToProps, actions)(App);
