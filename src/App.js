import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from "./redux/types";
import { loginUser, getUserData } from "./redux/actions/userActions";

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Singup from './pages/Singup';

// Components
import NavbarElem from './components/NavbarElem';
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken * 1000 < Date.now()) {
    store.dispatch(loginUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavbarElem/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <AuthRoute 
                  exact 
                  path="/login" 
                  component={Login}
                />
                <AuthRoute 
                  exact 
                  path="/singup" 
                  component={Singup}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
