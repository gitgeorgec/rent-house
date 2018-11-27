import React, { Component } from 'react';
import Index from './container/index'
import './boostrap.css';
import './index.css'
import { Provider} from 'react-redux'
import store from "../src/store"

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Index/>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
