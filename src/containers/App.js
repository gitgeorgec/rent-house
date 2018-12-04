import React, { Component } from 'react';
import Main from './Main'
import { Provider} from 'react-redux'
import store from "../store"
import { BrowserRouter as Router } from "react-router-dom"
import { setAuthorizationToken, setCurrentUser, checkAuth } from "../store/actions/auth"
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

  componentWillMount(){
    if(localStorage.jwtToken){
      const id = jwtDecode(localStorage.jwtToken).id
      checkAuth(id)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        localStorage.clear()
        store.dispatch(setCurrentUser({}))
        setAuthorizationToken(false)
        console.log(err)
      })
    }
  }

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
