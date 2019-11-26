import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Singup from './pages/Singup';

// Components
import NavbarElem from './components/NavbarElem';
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  
  if (decodedToken * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
                  authenticated={authenticated}
                />
                <AuthRoute 
                  exact 
                  path="/singup" 
                  component={Singup} 
                  authenticated={authenticated}
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
