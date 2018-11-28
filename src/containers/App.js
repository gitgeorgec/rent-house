import React, { Component } from 'react';
import Main from './Main'
import { Provider} from 'react-redux'
import store from "../store"
import { BrowserRouter as Router } from "react-router-dom"


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main/>
        </Router>
      </Provider>
    );
  }
}

export default App;
