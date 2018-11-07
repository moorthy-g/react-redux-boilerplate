import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import Seconds from 'components/seconds';
import { actions, STATE_KEY } from '../state';
import '../style.less';

const AsyncSeconds = lazy(() => import('components/async-seconds'));
const Loading = <div>Loading...</div>;

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
            <Suspense fallback={Loading}>
              Async seconds component <AsyncSeconds />
            </Suspense>
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
