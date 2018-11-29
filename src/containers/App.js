import React, { Component } from 'react';
import Main from './Main'
import { Provider} from 'react-redux'
import store from "../store"
import { BrowserRouter as Router } from "react-router-dom"
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth"
import jwtDecode from "jwt-decode"

if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken)
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
	} catch(e) {
		store.dispatch(setCurrentUser({}))
	}
}


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
